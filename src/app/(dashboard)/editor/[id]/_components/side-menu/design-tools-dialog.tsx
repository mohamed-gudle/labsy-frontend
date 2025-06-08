import { useUploadDesign } from "@/app/(dashboard)/editor/[id]/_lib/actions/use-upload-design";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Check,
  FileImage,
  FolderOpen,
  Upload,
  X,
} from "lucide-react";
import { useUploadedDesigns } from "./_utils/uploaded-designs-context";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { validateFile } from "./_utils/file-validation";
import { DesignToolsDialogState } from "./types";

const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file: File | undefined) =>
        !file || ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type),
      "Unsupported file format. Only PNG, JPEG, and SVG are allowed."
    )
    .refine(async (file: File | undefined) => {
      if (!file) return true;
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => (img.onload = resolve));
      // Check minimum resolution requirements
      return img.width >= 3000 && img.height >= 3000;
    }, "Image quality is too low. Minimum dimensions are 3000x3000px."),
});

const DesignToolsDialog = () => {
  const { addDesign } = useUploadedDesigns();
  const [state, setState] = useState<DesignToolsDialogState>({
    isOpen: false,
    preview: null,
    isDragging: false,
    uploadStatus: "idle",
    error: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState, setValue, trigger, reset } =
    useForm({
      resolver: zodResolver(uploadSchema),
    });
  const uploadDesign = useUploadDesign();

  const handleFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setState((prev) => ({
        ...prev,
        error: validationError,
        uploadStatus: "error",
      }));
      setValue("file", undefined);
      await trigger("file");
      return;
    }

    setState((prev) => ({
      ...prev,
      error: "",
      preview: URL.createObjectURL(file),
      uploadStatus: "idle",
    }));
    setValue("file", file);
    await trigger("file");
  };

  const handleDragEvents = (
    e: React.DragEvent<HTMLDivElement>,
    isDragging: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: false }));

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const openFileManager = (): void => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (): Promise<void> => {
    setState((prev) => ({ ...prev, uploadStatus: "uploading" }));
    try {
      const design = await uploadDesign();
      addDesign(design);
      setState((prev) => ({ ...prev, uploadStatus: "success" }));
      setTimeout(() => {
        setState({
          isOpen: false,
          preview: null,
          isDragging: false,
          uploadStatus: "idle",
          error: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);
    } catch {
      setState((prev) => ({
        ...prev,
        uploadStatus: "error",
        error: "Upload failed. Please try again.",
      }));
    }
  };

  const closeDialog = (): void => {
    setState({
      isOpen: false,
      preview: null,
      isDragging: false,
      uploadStatus: "idle",
      error: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog
      open={state.isOpen}
      onOpenChange={(isOpen) => {
        setState((prev) => ({
          ...prev,
          isOpen,
          error: "",
          uploadStatus: "idle",
          preview: null,
          isDragging: false,
        }));
        if (isOpen) {
          reset();
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2">
          <Upload size={18} />
          Upload Design
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <h2 className="text-lg font-semibold text-gray-900">Upload Design</h2>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Controller
            name="file"
            control={control}
            render={() => (
              <div
                onDragEnter={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${state.isDragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                {!state.preview ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <FileImage size={48} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        Drag & drop your design here
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        or click to browse files
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={openFileManager}
                      className="inline-flex items-center gap-2"
                    >
                      <FolderOpen size={16} />
                      Browse Files
                    </Button>
                    <p className="text-xs text-gray-500">
                      PNG, JPEG, SVG • Min 4000x4000px • 300 DPI
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={state.preview}
                        alt="Preview"
                        className="max-w-full max-h-32 mx-auto rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setState((prev) => ({
                            ...prev,
                            preview: null,
                            uploadStatus: "idle",
                          }));
                          setValue("file", undefined);
                          trigger("file");
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      Ready to upload
                    </p>
                  </div>
                )}

                {state.isDragging && (
                  <div className="absolute inset-0 bg-blue-100/80 border-2 border-blue-400 border-dashed rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Upload
                        size={32}
                        className="text-blue-600 mx-auto mb-2"
                      />
                      <p className="text-blue-700 font-medium">
                        Drop your file here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          />

          {(state.error || formState.errors.file?.message) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle
                size={16}
                className="text-red-500 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-red-700">
                {state.error}
                {state.error && formState.errors.file?.message && <br />}
                {formState.errors.file?.message}
              </p>
            </div>
          )}

          {state.uploadStatus === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              <p className="text-sm text-green-700">
                Design uploaded successfully!
              </p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !formState.isValid || state.uploadStatus === "uploading"
              }
            >
              {state.uploadStatus === "uploading" ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { DesignToolsDialog };
