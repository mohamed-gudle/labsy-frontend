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
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file: File) =>
        ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type),
      "Unsupported file format. Only PNG, JPEG, and SVG are allowed."
    )
    .refine(async (file: File) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => (img.onload = resolve));
      const dpi = (img.width / (file.size / 1024)) * 0.0254;
      return img.width >= 4000 && img.height >= 4000 && dpi >= 300;
    }, "Image quality is too low. Minimum dimensions are 4000x4000px and 300 DPI."),
});

type UploadStatus = "idle" | "uploading" | "success" | "error";

const DesignToolsDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState, setValue, watch } = useForm({
    resolver: zodResolver(uploadSchema),
  });
  const uploadDesign = useUploadDesign();
  const selectedFile = watch("file");

  const validateFile = (file: File): string | null => {
    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return "Unsupported file format. Only PNG, JPEG, and SVG are allowed.";
    }

    if (file.size > maxSize) {
      return "File size too large. Maximum size is 10MB.";
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setUploadStatus("error");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    setUploadStatus("idle");
    setValue("file", file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

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

  const onSubmit = async (data: { file: File }): Promise<void> => {
    setUploadStatus("uploading");
    try {
      await uploadDesign(data.file);
      setUploadStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        resetDialog();
      }, 1500);
    } catch (err) {
      setUploadStatus("error");
      setError("Upload failed. Please try again.");
    }
  };

  const resetDialog = (): void => {
    setPreview(null);
    setUploadStatus("idle");
    setError("");
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeDialog = (): void => {
    setIsOpen(false);
    resetDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2">
          <Upload size={18} />
          Upload Design
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <h2 className="text-lg font-semibold text-gray-900">Upload Desig</h2>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Area */}
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${
                    isDragging
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                {!preview ? (
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
                        src={preview}
                        alt="Preview"
                        className="max-w-full max-h-32 mx-auto rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setUploadStatus("idle");
                          setValue("file", undefined);
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

                {/* Drag Overlay */}
                {isDragging && (
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

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle
                size={16}
                className="text-red-500 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadStatus === "success" && (
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
              disabled={!formState.isValid || uploadStatus === "uploading"}
            >
              {uploadStatus === "uploading" ? (
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

