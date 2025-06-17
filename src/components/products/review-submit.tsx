/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Key,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { CompleteProductFormData } from "@/lib/schemas/products";
import { getColorName } from "@/utils/designs";

interface ReviewAndSubmitProps {
  data: CompleteProductFormData;
  onSubmit: () => Promise<void>;
  onBack: () => void;
}

export function ReviewAndSubmit({
  data,
  onSubmit,
  onBack,
}: ReviewAndSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await onSubmit();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <Badge variant="outline">Final Step</Badge>
      </div>

      {/* Product Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Product Name
              </h4>
              <p className="font-medium">{data.title}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              Description
            </h4>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Category
              </h4>
              <p className="text-sm">{data.category}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Images */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              Main Product Images
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {data.main_image && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(data.main_image)}
                    alt={`Product`}
                    className="w-full h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mockup Files */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              Mockup Files
            </h4>
            <div className="space-y-2">
              {data.print_areas?.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center space-x-3">
                    {area.mockup_file && (
                      <img
                        src={URL.createObjectURL(area.mockup_file)}
                        alt={area.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{area.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {area.mockup_file
                          ? formatFileSize(area.mockup_file.size)
                          : "No file"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Print Area</p>
                    <p className="text-xs font-mono">
                      {Math.round(area.width)}×{Math.round(area.height)}px
                    </p>
                  </div>
                </div>
              )) || []}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors & Sizes */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.colors?.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 border rounded"
                >
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm">{getColorName(color)}</span>
                </div>
              )) || []}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.available_sizes)
                ? data.available_sizes.map(
                    (
                      size:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<unknown, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: Key | null | undefined
                    ) => (
                      <Badge key={index} variant="secondary">
                        {size}
                      </Badge>
                    )
                  )
                : null}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Areas Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Print Areas Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.print_areas?.map((area, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div>
                  <h4 className="font-medium">{area.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    {area.printable ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-xs">
                      {area.printable ? "Printable" : "Non-printable"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {area.dpi} DPI
                  </p>
                </div>
              </div>
            )) || []}
          </div>
        </CardContent>
      </Card>

      {/* Submit Error */}
      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back to Print Areas
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="min-w-32"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit Product
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
