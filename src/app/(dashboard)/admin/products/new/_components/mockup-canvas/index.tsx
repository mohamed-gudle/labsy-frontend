"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Line } from "react-konva";
import useImage from "use-image";
import { PrintableAreaInput, PrintAreaSelection, MockupImageInfo } from "../../_types/admin-new";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ZoomIn, ZoomOut, Grid3X3, RotateCcw } from "lucide-react";
import Konva from "konva";

interface MockupCanvasProps {
  printArea: PrintableAreaInput;
  onPrintAreaUpdate: (updates: Partial<PrintableAreaInput>) => void;
  errors: Record<string, string>;
  onValidationError: (errors: Record<string, string>) => void;
}

export const MockupCanvas: React.FC<MockupCanvasProps> = ({
  printArea,
  onPrintAreaUpdate,
}) => {
  // Always use mockup_url for image source
  const [mockupImage] = useImage(printArea.mockup_url || "");
  const [selection, setSelection] = useState<PrintAreaSelection>({
    x: printArea.x,
    y: printArea.y,
    width: printArea.width,
    height: printArea.height,
  }); const [isSelecting, setIsSelecting] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [gridVisible, setGridVisible] = useState(true);
  const [imageInfo, setImageInfo] = useState<MockupImageInfo | null>(null);

  const stageRef = useRef<Konva.Stage>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 500 });

  // Responsive canvas size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 900); // max width
        const height = Math.round(width * 5 / 6); // keep aspect ratio ~6:5
        setCanvasSize({ width, height });
      }
    };
    updateSize();
    const ro = new window.ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const maxImageWidth = canvasSize.width - 40;
  const maxImageHeight = canvasSize.height - 40;

  // Calculate image display size and position
  const getImageDisplayInfo = useCallback(() => {
    if (!mockupImage) return null;

    const aspectRatio = mockupImage.width / mockupImage.height;
    let displayWidth = maxImageWidth;
    let displayHeight = maxImageHeight;

    if (aspectRatio > maxImageWidth / maxImageHeight) {
      displayHeight = maxImageWidth / aspectRatio;
    } else {
      displayWidth = maxImageHeight * aspectRatio;
    }

    const x = (canvasSize.width - displayWidth) / 2;
    const y = (canvasSize.height - displayHeight) / 2;

    return {
      x,
      y,
      width: displayWidth,
      height: displayHeight,
      scaleX: displayWidth / mockupImage.width,
      scaleY: displayHeight / mockupImage.height,
    };
  }, [mockupImage, maxImageWidth, maxImageHeight, canvasSize.width, canvasSize.height]);

  const imageDisplayInfo = useMemo(() => getImageDisplayInfo(), [getImageDisplayInfo]);

  // Update image info when mockup changes
  useEffect(() => {
    if (mockupImage && imageDisplayInfo) {
      setImageInfo({
        width: imageDisplayInfo.width,
        height: imageDisplayInfo.height,
        naturalWidth: mockupImage.width,
        naturalHeight: mockupImage.height,
        url: printArea.mockup_url || "",
      });
    }
  }, [mockupImage, imageDisplayInfo, printArea.mockup_url]);

  // Convert canvas coordinates to image coordinates
  const canvasToImageCoords = useCallback((canvasX: number, canvasY: number) => {
    if (!imageDisplayInfo) return { x: 0, y: 0 };

    const relativeX = (canvasX - imageDisplayInfo.x) / zoom - pan.x;
    const relativeY = (canvasY - imageDisplayInfo.y) / zoom - pan.y;

    return {
      x: Math.max(0, Math.min(mockupImage?.width || 0, relativeX / imageDisplayInfo.scaleX)),
      y: Math.max(0, Math.min(mockupImage?.height || 0, relativeY / imageDisplayInfo.scaleY)),
    };
  }, [imageDisplayInfo, zoom, pan, mockupImage]);

  // Convert image coordinates to canvas coordinates
  const imageToCanas = useCallback((imageX: number, imageY: number) => {
    if (!imageDisplayInfo) return { x: 0, y: 0 };

    return {
      x: imageDisplayInfo.x + (imageX * imageDisplayInfo.scaleX + pan.x) * zoom,
      y: imageDisplayInfo.y + (imageY * imageDisplayInfo.scaleY + pan.y) * zoom,
    };
  }, [imageDisplayInfo, zoom, pan]);

  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!imageDisplayInfo) return;

    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    const imageCoords = canvasToImageCoords(pos.x, pos.y);

    setIsSelecting(true);
    setDragStart({ x: pos.x, y: pos.y });
    setSelection({
      x: imageCoords.x,
      y: imageCoords.y,
      width: 0,
      height: 0,
    });
  }, [imageDisplayInfo, canvasToImageCoords]);

  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isSelecting || !dragStart || !imageDisplayInfo) return;

    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    const startImageCoords = canvasToImageCoords(dragStart.x, dragStart.y);
    const currentImageCoords = canvasToImageCoords(pos.x, pos.y);

    const newSelection = {
      x: Math.min(startImageCoords.x, currentImageCoords.x),
      y: Math.min(startImageCoords.y, currentImageCoords.y),
      width: Math.abs(currentImageCoords.x - startImageCoords.x),
      height: Math.abs(currentImageCoords.y - startImageCoords.y),
    };

    setSelection(newSelection);
  }, [isSelecting, dragStart, imageDisplayInfo, canvasToImageCoords]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting && selection.width > 10 && selection.height > 10) {
      onPrintAreaUpdate({
        x: Math.round(selection.x),
        y: Math.round(selection.y),
        width: Math.round(selection.width),
        height: Math.round(selection.height),
      });
    }
    setIsSelecting(false);
    setDragStart(null);
  }, [isSelecting, selection, onPrintAreaUpdate]);

  const handleFileUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    onPrintAreaUpdate({ mockup_file: file, mockup_url: url });
  }, [onPrintAreaUpdate]);

  const handleZoom = useCallback((delta: number) => {
    setZoom(prev => Math.max(0.1, Math.min(5, prev + delta)));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const renderGrid = useCallback(() => {
    if (!gridVisible || !imageDisplayInfo) return null;

    const lines = [];
    const gridSize = 20 * zoom;
    const startX = imageDisplayInfo.x % gridSize;
    const startY = imageDisplayInfo.y % gridSize;

    // Vertical lines
    for (let i = startX; i < canvasSize.width; i += gridSize) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i, 0, i, canvasSize.height]}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1}
        />
      );
    }

    // Horizontal lines
    for (let i = startY; i < canvasSize.height; i += gridSize) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i, canvasSize.width, i]}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1}
        />
      );
    }

    return lines;
  }, [gridVisible, zoom, imageDisplayInfo, canvasSize.width, canvasSize.height]);

  const renderSelection = useCallback(() => {
    if (!imageDisplayInfo) return null;

    const canvasCoords = imageToCanas(selection.x, selection.y);
    const endCoords = imageToCanas(selection.x + selection.width, selection.y + selection.height);

    return (
      <Rect
        x={canvasCoords.x}
        y={canvasCoords.y}
        width={endCoords.x - canvasCoords.x}
        height={endCoords.y - canvasCoords.y}
        stroke="#3B82F6"
        strokeWidth={2}
        dash={[5, 5]}
        fill="rgba(59, 130, 246, 0.1)"
      />
    );
  }, [selection, imageDisplayInfo, imageToCanas]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mockup Canvas</h3>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGridVisible(!gridVisible)}
              className={gridVisible ? "bg-blue-50 text-blue-600" : ""}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleZoom(0.1)}>
              <ZoomIn size={16} />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleZoom(-0.1)}>
              <ZoomOut size={16} />
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw size={16} />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="relative w-full">
          {mockupImage ? (
            <div className="border border-gray-300 rounded-lg overflow-hidden w-full" style={{ height: canvasSize.height }}>
              <Stage
                ref={stageRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ backgroundColor: "#f8f9fa", width: "100%", height: "100%" }}
              >
                {/* Grid Layer */}
                <Layer>
                  {renderGrid()}
                </Layer>

                {/* Image Layer */}
                <Layer>
                  {imageDisplayInfo && (
                    <KonvaImage
                      image={mockupImage}
                      x={imageDisplayInfo.x + pan.x * zoom}
                      y={imageDisplayInfo.y + pan.y * zoom}
                      width={imageDisplayInfo.width * zoom}
                      height={imageDisplayInfo.height * zoom}
                    />
                  )}
                </Layer>

                {/* Selection Layer */}
                <Layer>
                  {renderSelection()}
                </Layer>
              </Stage>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center w-full"
              style={{ width: "100%", height: canvasSize.height }}
            >
              <div className="text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">Upload Mockup Image</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Upload a high-quality image of your product to define print areas
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose Image
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
        </div>

        {/* Instructions */}
        {mockupImage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">How to select print area:</h4>
            <p className="text-sm text-blue-700">
              Click and drag on the mockup image to select the printable area.
              The coordinates will be automatically updated in real-time.
            </p>
          </div>
        )}

        {/* Canvas Info */}
        {imageInfo && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Original:</span>
              <div className="text-gray-500">{imageInfo.naturalWidth} × {imageInfo.naturalHeight}px</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Display:</span>
              <div className="text-gray-500">{Math.round(imageInfo.width)} × {Math.round(imageInfo.height)}px</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Zoom:</span>
              <div className="text-gray-500">{Math.round(zoom * 100)}%</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Selection:</span>
              <div className="text-gray-500">
                {Math.round(selection.width)} × {Math.round(selection.height)}px
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
