'use client';

import Konva from "konva";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import { useColorOverlay } from "../../_hooks/use-color-overlay";
import { DesignCanvasProps } from "../../_types/design";
import { DesignImageLayer } from "./design-image-layer";
import { useCanvasSize } from "../../_hooks/use-canva-size";


export const DesignCanvas = ({
  currentPrintArea,
  selectedColor,
  designState,
  onDesignStateChange,
  recenterDesignSignal,
}: DesignCanvasProps) => {
  const { stageContainerRef, stageSize, sceneWidth, sceneHeight } = useCanvasSize();
  const [baseProductImage] = useImage(currentPrintArea?.mockup_url as string);
  const colorOverlayImage = useColorOverlay(baseProductImage, selectedColor, sceneWidth, sceneHeight);

  if (!currentPrintArea) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No print area available
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-sm p-4">
      <div
        ref={stageContainerRef}
        className="relative w-full h-full max-w-2xl max-h-[600px] flex items-center justify-center"
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={stageSize.scale}
          scaleY={stageSize.scale}
          style={{
            backgroundColor: "transparent",
            margin: "auto",
          }}
        >
          {/* Base product and color overlay layer */}
          <Layer>
            <KonvaImage
              image={baseProductImage}
              x={0}
              y={0}
              width={sceneWidth}
              height={sceneHeight}
            />
            {colorOverlayImage && (
              <KonvaImage
                image={colorOverlayImage}
                x={0}
                y={0}
                width={sceneWidth}
                height={sceneHeight}
                opacity={1}
                globalCompositeOperation={
                  "multiply" as globalThis.CanvasRenderingContext2D["globalCompositeOperation"]
                }
              />
            )}
          </Layer>
          
          {/* Design layer */}
          <Layer
            clipFunc={(ctx: Konva.Context) => {
              ctx.beginPath();
              ctx.rect(
                currentPrintArea.x,
                currentPrintArea.y,
                currentPrintArea.width,
                currentPrintArea.height
              );
              ctx.closePath();
            }}
          >
            {/* Mask outside printable area */}
            <Rect
              x={0}
              y={0}
              width={sceneWidth}
              height={sceneHeight}
              fill="rgba(0, 0, 0, 0.1)"
              globalCompositeOperation="destination-out"
            />
            
            {/* Dashed border for printable area */}
            <Rect
              x={currentPrintArea.x}
              y={currentPrintArea.y}
              width={currentPrintArea.width}
              height={currentPrintArea.height}
              stroke="rgba(100, 100, 100, 0.5)"
              strokeWidth={2}
              dash={[5, 5]}
              perfectDrawEnabled={false}
              shadowForStrokeEnabled={false}
            />
            
            {/* Design content */}
            <DesignImageLayer
              printableArea={currentPrintArea}
              recenterDesignSignal={recenterDesignSignal}
              designState={designState}
              onDesignStateChange={onDesignStateChange}
            />
          </Layer>
        </Stage>

        {/* Control buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
            👁 Preview
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            ✏️ Design
          </button>
        </div>

        {/* Debug info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded">
          Current: {currentPrintArea.name || 'Untitled Area'}
        </div>
      </div>
    </div>
  );
};