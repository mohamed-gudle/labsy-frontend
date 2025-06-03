"use client";

import { useEffect, useRef, useState, FC } from "react";
import {
  Layer,
  Rect,
  Stage,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import TShirtBack from "@/components/assets/tshirt-back";
import { renderToStaticMarkup } from "react-dom/server";
import Konva from "konva";

interface PrintableArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DesignImageLayerProps {
  printableArea: PrintableArea;
  recenterDesignSignal: number;
}

const DesignImageLayer: FC<DesignImageLayerProps> = ({
  printableArea,
  recenterDesignSignal,
}) => {
  const [designImage] = useImage("/logo-single.png");
  const [isSelected, setSelected] = useState<boolean>(false);
  const [designImagePosition, setDesignImagePosition] = useState<{ x: number; y: number }>({
    x: printableArea.x + printableArea.width / 2 - 50, 
    y: printableArea.y + printableArea.height / 2 - 50,
  });
  const designImageRef = useRef<Konva.Image | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && designImageRef.current) {
      transformerRef.current.nodes([designImageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  // Recenter when recenterDesignSignal changes
  useEffect(() => {
    setDesignImagePosition({
      x: printableArea.x + printableArea.width / 2 - 50,
      y: printableArea.y + printableArea.height / 2 - 50,
    });
  }, [recenterDesignSignal, printableArea]);

  return (
    <>
      <KonvaImage
        ref={designImageRef}
        image={designImage}
        x={designImagePosition.x}
        y={designImagePosition.y}
        width={100}
        height={100}
        draggable
        dragBoundFunc={(pos) => {
          // Restrict dragging within printableArea
          const minX = printableArea.x;
          const minY = printableArea.y;
          const maxX = printableArea.x + printableArea.width - 100;
          const maxY = printableArea.y + printableArea.height - 100;
          return {
            x: Math.max(minX, Math.min(pos.x, maxX)),
            y: Math.max(minY, Math.min(pos.y, maxY)),
          };
        }}
        onDragEnd={(e) =>
          setDesignImagePosition({ x: e.target.x(), y: e.target.y() })
        }
        onClick={() => setSelected(!isSelected)}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size
            if (newBox.width < 50 || newBox.height < 50) return oldBox;
            // Limit maximum size
            if (newBox.width > 300 || newBox.height > 300) return oldBox;
            // Limit scale factor (e.g., max 2x, min 0.5x of original)
            const scaleX = newBox.width / oldBox.width;
            const scaleY = newBox.height / oldBox.height;

            if (scaleX > 2 || scaleX < 0.5 || scaleY > 2 || scaleY < 0.5)
              return oldBox;

            return newBox;
          }}
        />
      )}
    </>
  );
};

// Mock SideMenu component - replace with your actual component
const SideMenu: FC = () => {
  return (
    <div className="w-full h-full bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Design your product</h2>
      <p className="text-sm text-gray-500 mb-6">Max file size of 50MB</p>

      {/* Design options */}
      <div className="flex gap-4 mb-8">
        <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <span className="text-sm">Add Image</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <span className="text-sm">Add Text</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-gray-400 relative">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <span className="text-sm">Design with Adobe Express</span>
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        </button>
      </div>

      {/* Color selection */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-3">Choose product colors</h3>
        <p className="text-xs text-gray-500 mb-3">
          Select up to 5 backgrounds for your product
        </p>
        <div className="flex gap-2 flex-wrap">
          {[
            "#000000",
            "#FFFFFF",
            "#4B5563",
            "#DC2626",
            "#059669",
            "#7C3AED",
            "#F59E0B",
            "#EC4899",
            "#3B82F6",
            "#6B7280",
          ].map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-3">Set your pricing</h3>
        <p className="text-xs text-gray-500 mb-3">
          Enter your desired retail price for fans from different regions
        </p>
        <div className="flex gap-2 mb-3">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm">
            USA
          </button>
          <button className="px-4 py-2 border rounded-full text-sm">EUR</button>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value="$ 22.99"
            className="border rounded px-3 py-2 w-24"
            readOnly
          />
          <span className="text-sm text-gray-500">$7.09 Profit/Sale</span>
        </div>
      </div>

      {/* Advanced section */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm font-medium">
          Advanced
        </summary>
        <div className="mt-4 p-4 bg-gray-50 rounded">
          {/* Advanced options would go here */}
        </div>
      </details>
    </div>
  );
};

const TShirtMockupGenerator: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageContainerRef = useRef<HTMLDivElement | null>(null);

  // Virtual size for the scene - adjusted for better proportions
  const sceneWidth = 400;
  const sceneHeight = 500;

  // State to track current scale and dimensions
  const [stageSize, setStageSize] = useState({
    width: sceneWidth,
    height: sceneHeight,
    scale: 1,
  });

  // Adjusted printable area for better positioning
  const [printableArea] = useState<PrintableArea>({
    x: 125,
    y: 150,
    width: 150,
    height: 200,
  });

  // Recenter signal state
  const [recenterDesignSignal, setRecenterDesignSignal] = useState<number>(0);

  // Function to handle resize
  const updateSize = () => {
    if (!stageContainerRef.current) return;

    // Get container dimensions
    const containerWidth = stageContainerRef.current.offsetWidth;
    const containerHeight = stageContainerRef.current.offsetHeight;

    // Calculate scale to fit within container while maintaining aspect ratio
    const scaleX = containerWidth / sceneWidth;
    const scaleY = containerHeight / sceneHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

    // Update state with new dimensions
    setStageSize({
      width: sceneWidth * scale,
      height: sceneHeight * scale,
      scale: scale,
    });
  };

  // Update on mount and when window resizes
  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const svgString = encodeURIComponent(renderToStaticMarkup(<TShirtBack />));
  const dataUrl = `data:image/svg+xml,${svgString}`;
  const [baseProductImage] = useImage(dataUrl);

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row gap-6 w-full h-screen p-4 bg-gray-50"
    >
      {/* Side Menu - Fixed width on desktop */}
      <div className="w-full lg:w-80 lg:max-w-sm overflow-y-auto">
        <SideMenu />
      </div>

      {/* Mockup Generator - Centered and responsive */}
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
            <Layer>
              <KonvaImage
                image={baseProductImage}
                x={0}
                y={0}
                width={sceneWidth}
                height={sceneHeight}
              />
            </Layer>
            {/* Layer showing the printable area boundary */}
            <Layer>
              <Rect
                x={0}
                y={0}
                width={sceneWidth}
                height={sceneHeight}
                fill="rgba(0, 0, 0, 0.1)"
                globalCompositeOperation="destination-out"
                clipFunc={(ctx: Konva.Context) => {
                  ctx.beginPath();
                  ctx.rect(
                    printableArea.x,
                    printableArea.y,
                    printableArea.width,
                    printableArea.height
                  );
                  ctx.closePath();
                }}
              />
              <Rect
                x={printableArea.x}
                y={printableArea.y}
                width={printableArea.width}
                height={printableArea.height}
                stroke="rgba(100, 100, 100, 0.5)"
                strokeWidth={2}
                dash={[5, 5]}
                perfectDrawEnabled={false}
                shadowForStrokeEnabled={false}
              />
            </Layer>

            {/* Layer with clipped design content */}
            <Layer
              clipFunc={(ctx: Konva.Context) => {
                ctx.beginPath();
                ctx.rect(
                  printableArea.x,
                  printableArea.y,
                  printableArea.width,
                  printableArea.height
                );
                ctx.closePath();
              }}
            >
              <DesignImageLayer
                printableArea={printableArea}
                recenterDesignSignal={recenterDesignSignal}
              />
            </Layer>
          </Stage>

          {/* Preview and Design buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
              👁 Preview
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800">
              ✏️ Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtMockupGenerator;
