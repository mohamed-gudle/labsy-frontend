"use client";

import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { basicProductSchema, BasicProductFormData } from "../../_form-schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Plus, Minus } from "lucide-react";
import { ProductFormData } from "../../_types/admin";

interface BasicProductFormProps {
  data: Partial<ProductFormData>;
  onChange: (data: Partial<ProductFormData>) => void;
  onValidationError: (errors: Record<string, string>) => void;
}

export const BasicProductForm: React.FC<BasicProductFormProps> = ({
  data,
  onChange,
  onValidationError,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.main_image ? URL.createObjectURL(data.main_image) : null
  );
  const [colorInput, setColorInput] = useState("");
  const [sizeKey, setSizeKey] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors: formErrors },
  } = useForm<BasicProductFormData>({
    resolver: zodResolver(basicProductSchema),
    defaultValues: {
      title: data.title || "",
      description: data.description || "",

      category: data.category || "",
      material: data.material || "",

      base_cost: data.base_cost || 0,

      colors: data.colors || [],
      available_sizes: data.available_sizes || {},
    },
  });

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        setValue("main_image", file);
        onChange({ main_image: file });
        await trigger("main_image");
      } else {
        setImagePreview(null);
        // Don't setValue for undefined, just clear the preview and notify parent
        onChange({ main_image: undefined });
      }
    },
    [setValue, onChange, trigger]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileChange(files[0]);
      }
    },
    [handleFileChange]
  );

  const addColor = () => {
    if (colorInput && /^#[0-9A-Fa-f]{6}$/.test(colorInput)) {
      const currentColors = data.colors || [];
      if (!currentColors.includes(colorInput) && currentColors.length < 10) {
        const newColors = [...currentColors, colorInput];
        setValue("colors", newColors);
        onChange({ colors: newColors });
        setColorInput("");
      }
    }
  };

  const removeColor = (colorToRemove: string) => {
    const currentColors = data.colors || [];
    const newColors = currentColors.filter((color) => color !== colorToRemove);
    setValue("colors", newColors);
    onChange({ colors: newColors });
  };

  const addSize = () => {
    if (sizeKey && sizeValue) {
      const currentSizes =
        (data.available_sizes as Record<string, number>) || {};
      const newSizes = { ...currentSizes, [sizeKey]: parseInt(sizeValue) };
      setValue("available_sizes", newSizes);
      onChange({ available_sizes: newSizes });
      setSizeKey("");
      setSizeValue("");
    }
  };

  const removeSize = (sizeToRemove: string) => {
    const currentSizes = (data.available_sizes as Record<string, number>) || {};
    const newSizes = { ...currentSizes };
    delete newSizes[sizeToRemove];
    setValue("available_sizes", newSizes);
    onChange({ available_sizes: newSizes });
  };

  const onSubmit = (formData: BasicProductFormData) => {
    onChange(formData);
    onValidationError({});
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Basic Product Information
        </h2>
        <p className="text-gray-600">
          Enter the essential details for your product
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              {...register("title")}
              onChange={(e) => {
                register("title").onChange(e);
                onChange({ title: e.target.value });
              }}
              placeholder="e.g., Regular Fit Short Sleeve Tee"
              className={formErrors.title ? "border-red-500" : ""}
            />
            {formErrors.title && (
              <p className="text-sm text-red-600">{formErrors.title.message}</p>
            )}
          </div>


          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              {...register("category")}
              onChange={(e) => {
                register("category").onChange(e);
                onChange({ category: e.target.value });
              }}
              placeholder="e.g., T-shirt"
              className={formErrors.category ? "border-red-500" : ""}
            />
            {formErrors.category && (
              <p className="text-sm text-red-600">
                {formErrors.category.message}
              </p>
            )}
          </div>



          {/* Material */}
          <div className="space-y-2">
            <Label htmlFor="material">Material *</Label>
            <Input
              id="material"
              {...register("material")}
              onChange={(e) => {
                register("material").onChange(e);
                onChange({ material: e.target.value });
              }}
              placeholder="e.g., 100% cotton"
              className={formErrors.material ? "border-red-500" : ""}
            />
            {formErrors.material && (
              <p className="text-sm text-red-600">
                {formErrors.material.message}
              </p>
            )}
          </div>



          {/* Base Cost */}
          <div className="space-y-2">
            <Label htmlFor="base_cost">Base Cost (USD) *</Label>
            <Input
              id="base_cost"
              type="number"
              step="0.01"
              {...register("base_cost", { valueAsNumber: true })}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                register("base_cost").onChange(e);
                onChange({ base_cost: value });
              }}
              placeholder="25.00"
              className={formErrors.base_cost ? "border-red-500" : ""}
            />          {formErrors.base_cost && (
              <p className="text-sm text-red-600">
                {formErrors.base_cost.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            {...register("description")}
            onChange={(e) => {
              register("description").onChange(e);
              onChange({ description: e.target.value });
            }}
            rows={4}
            placeholder="Describe your product in detail..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.description ? "border-red-500" : "border-gray-300"
              }`}
          />
          {formErrors.description && (
            <p className="text-sm text-red-600">
              {formErrors.description.message}
            </p>
          )}
        </div>

        {/* Main Image Upload */}
        <div className="space-y-2">
          <Label>Main Product Image *</Label>
          <Controller
            name="main_image"
            control={control}
            render={() => (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${formErrors.main_image
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="max-w-full max-h-48 mx-auto rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleFileChange(null)}
                      className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload size={48} className="mx-auto text-gray-400" />
                    <div>
                      <p className="text-gray-600 font-medium">
                        Drag & drop your image here
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        or click to browse files
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                    >
                      Choose File
                    </Button>
                  </div>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(file);
                  }}
                  className="hidden"
                />
              </div>
            )}
          />
          {formErrors.main_image && (
            <p className="text-sm text-red-600">
              {formErrors.main_image.message}
            </p>
          )}
        </div>

        {/* Colors Section */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Available Colors</h3>

          {/* Add Color */}
          <div className="flex gap-2 mb-4">
            <Input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="#FFFFFF"
              className="flex-1"
            />
            <Button type="button" onClick={addColor} variant="outline">
              <Plus size={16} />
            </Button>
          </div>

          {/* Color List */}
          <div className="flex flex-wrap gap-2">
            {(data.colors || []).map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
              >
                <div
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-mono">{color}</span>
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus size={14} />
                </button>
              </div>
            ))}
          </div>
          {formErrors.colors && (
            <p className="text-sm text-red-600 mt-2">
              {formErrors.colors.message}
            </p>
          )}
        </Card>

        {/* Sizes Section */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Available Sizes</h3>

          {/* Add Size */}
          <div className="flex gap-2 mb-4">
            <Input
              value={sizeKey}
              onChange={(e) => setSizeKey(e.target.value)}
              placeholder="Size (e.g., M)"
              className="flex-1"
            />
            <Input
              type="number"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              placeholder="Stock"
              className="w-24"
            />
            <Button type="button" onClick={addSize} variant="outline">
              <Plus size={16} />
            </Button>
          </div>

          {/* Size List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(
              (data.available_sizes as Record<string, number>) || {}
            ).map(([size, stock]) => (
              <div
                key={size}
                className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2"
              >
                <span className="text-sm font-medium">
                  {size}: {stock}
                </span>
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus size={14} />
                </button>
              </div>
            ))}
          </div>
          {formErrors.available_sizes && (
            <p className="text-sm text-red-600 mt-2">
              {formErrors.available_sizes.message}
            </p>
          )}
        </Card>
      </form>
    </div>
  );
};
