/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { DesignState, PrintableArea } from "../../_types/design";


interface DesignImageLayerProps {
  printableArea: PrintableArea;
  recenterDesignSignal: number;
  designState: DesignState;
  onDesignStateChange: (state: DesignState) => void;
}

export const DesignImageLayer = ({
  printableArea,
  recenterDesignSignal,
  designState,
  onDesignStateChange,
}: DesignImageLayerProps) => {
  const [designImage] = useImage(designState.imageUrl || "/logo-single.png");
  const designImageRef = useRef<Konva.Image | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (designState.isSelected && transformerRef.current && designImageRef.current) {
      transformerRef.current.nodes([designImageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [designState.isSelected]);

  // Recenter when recenterDesignSignal changes
  useEffect(() => {
    const newPosition = {
      x: printableArea.x + printableArea.width / 2 - 50,
      y: printableArea.y + printableArea.height / 2 - 50,
    };
    onDesignStateChange({
      ...designState,
      position: newPosition,
    });
  }, [recenterDesignSignal, printableArea, designState, onDesignStateChange]);

  const handleTransformEnd = () => {
    if (!designImageRef.current) return;

    const node = designImageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    onDesignStateChange({
      ...designState,
      position: { x: node.x(), y: node.y() },
      scale: { x: scaleX, y: scaleY },
      rotation: node.rotation(),
    });
  };

  const handleClick = () => {
    onDesignStateChange({
      ...designState,
      isSelected: !designState.isSelected,
    });
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onDesignStateChange({
      ...designState,
      position: { x: e.target.x(), y: e.target.y() },
    });
  };

  const dragBoundFunc = (pos: { x: number; y: number }) => {
    // Restrict dragging within printableArea
    const minX = printableArea.x;
    const minY = printableArea.y;
    const maxX = printableArea.x + printableArea.width - 100 * designState.scale.x;
    const maxY = printableArea.y + printableArea.height - 100 * designState.scale.y;
    return {
      x: Math.max(minX, Math.min(pos.x, maxX)),
      y: Math.max(minY, Math.min(pos.y, maxY)),
    };
  };

  const boundBoxFunc = (oldBox: any, newBox: any) => {
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
  };

  return (
    <>
      <KonvaImage
        ref={designImageRef}
        image={designImage}
        x={designState.position.x}
        y={designState.position.y}
        scaleX={designState.scale.x}
        scaleY={designState.scale.y}
        rotation={designState.rotation}
        width={100}
        height={100}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        onClick={handleClick}
      />
      {designState.isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={boundBoxFunc}
        />
      )}
    </>
  );
};