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

  const svgString = encodeURIComponent(renderToStaticMarkup(<TShirtBack />));
  const dataUrl = `data:image/svg+xml,${svgString}`;
  const [svgImage] = useImage(dataUrl);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: 800,
        aspectRatio: "1 / 1",
        margin: "0 auto",
      }}
    >
      <button
        style={{ margin: 8 }}
        onClick={() => setRecenterSignal((s) => s + 1)}
      >
        Recenter Image
      </button>
      <Stage width={size} height={size}>
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
  );
};

export default TShirtMockupGenerator;
