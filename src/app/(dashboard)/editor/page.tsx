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
import SideMenu from "./components/side-menu";

interface ClipRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MyImageProps {
  clipRect: ClipRect;
  recenterSignal: number;
}

const MyImage: FC<MyImageProps> = ({ clipRect, recenterSignal }) => {
  const [image] = useImage("/logo-single.png");
  const [isSelected, setSelected] = useState<boolean>(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({
    x: clipRect.x + clipRect.width / 2 - 50,
    y: clipRect.y + clipRect.height / 2 - 50,
  });
  const imageRef = useRef<Konva.Image | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  // Recenter when recenterSignal changes
  useEffect(() => {
    setPos({
      x: clipRect.x + clipRect.width / 2 - 50,
      y: clipRect.y + clipRect.height / 2 - 50,
    });
  }, [recenterSignal, clipRect]);

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={image}
        x={pos.x}
        y={pos.y}
        width={100}
        height={100}
        draggable
        dragBoundFunc={(pos) => {
          // Restrict dragging within clipRect
          const minX = clipRect.x;
          const minY = clipRect.y;
          const maxX = clipRect.x + clipRect.width - 100;
          const maxY = clipRect.y + clipRect.height - 100;
          return {
            x: Math.max(minX, Math.min(pos.x, maxX)),
            y: Math.max(minY, Math.min(pos.y, maxY)),
          };
        }}
        onDragEnd={(e) => setPos({ x: e.target.x(), y: e.target.y() })}
        onClick={() => setSelected(!isSelected)}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
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

const TShirtMockupGenerator: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<number>(800);
  const [viewportHeight, setViewportHeight] = useState<number>(800);
  // Rectangle clip area state
  const [clipRect] = useState<ClipRect>({
    x: 250,
    y: 200,
    width: 300,
    height: 300,
  });
  const [recenterSignal, setRecenterSignal] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    // Use ResizeObserver for container size
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setSize(width);
      }
    });
    observer.observe(containerRef.current);
    // Set initial size
    setSize(containerRef.current.offsetWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const svgString = encodeURIComponent(renderToStaticMarkup(<TShirtBack />));
  const dataUrl = `data:image/svg+xml,${svgString}`;
  const [svgImage] = useImage(dataUrl);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Side Menu */}
      <div className="w-full md:w-1/3">
        <SideMenu />
      </div>

      {/* Mockup Generator */}
      <div
        ref={containerRef}
        className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-4"
        style={{
          maxWidth: 800,
          aspectRatio: "1 / 1",
          margin: "0 auto",
          height: "100vh", // Set the stage to full view height
        }}
      >
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setRecenterSignal((s) => s + 1)}
        >
          Recenter Image
        </button>
        <Stage width={size} height={viewportHeight} style={{ backgroundColor: "white" }}>
          <Layer>
            <KonvaImage image={svgImage} x={0} y={0} width={800} height={800} />
          </Layer>
          {/* Layer showing the printable area boundary */}
          <Layer>
            <Rect
              x={0}
              y={0}
              width={800}
              height={800}
              fill="rgba(0, 0, 0, 0.2)"
              globalCompositeOperation="destination-out"
              clipFunc={(ctx: Konva.Context) => {
                ctx.beginPath();
                ctx.rect(clipRect.x, clipRect.y, clipRect.width, clipRect.height);
                ctx.closePath();
              }}
            />
            <Rect
              x={clipRect.x}
              y={clipRect.y}
              width={clipRect.width}
              height={clipRect.height}
              stroke="rgba(255, 255, 255, 0.8)"
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
              ctx.rect(clipRect.x, clipRect.y, clipRect.width, clipRect.height);
              ctx.closePath();
            }}
          >
            <MyImage clipRect={clipRect} recenterSignal={recenterSignal} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default TShirtMockupGenerator;
