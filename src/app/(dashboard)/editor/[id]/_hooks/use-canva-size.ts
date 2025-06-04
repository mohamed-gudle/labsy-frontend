import { useState, useEffect, useRef, useCallback } from 'react';
import { CanvasSize } from '../_types/design';


export const useCanvasSize = (sceneWidth: number = 400, sceneHeight: number = 500) => {
  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const [stageSize, setStageSize] = useState<CanvasSize>({
    width: sceneWidth,
    height: sceneHeight,
    scale: 1,
  });

  const updateSize = useCallback(() => {
    if (!stageContainerRef.current) return;
    
    const containerWidth = stageContainerRef.current.offsetWidth;
    const containerHeight = stageContainerRef.current.offsetHeight;
    const scaleX = containerWidth / sceneWidth;
    const scaleY = containerHeight / sceneHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    
    setStageSize({
      width: sceneWidth * scale,
      height: sceneHeight * scale,
      scale: scale,
    });
  }, [sceneWidth, sceneHeight]);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  return {
    stageContainerRef,
    stageSize,
    sceneWidth,
    sceneHeight,
  };
};