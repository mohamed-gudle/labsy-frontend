import { useState, useEffect } from 'react';

export const useColorOverlay = (
  baseProductImage: HTMLImageElement | undefined,
  selectedColor: string,
  sceneWidth: number,
  sceneHeight: number
) => {
  const [colorOverlayImage, setColorOverlayImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!baseProductImage) return;

    const canvas = document.createElement("canvas");
    canvas.width = sceneWidth;
    canvas.height = sceneHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Fill with selected color
    ctx.fillStyle = selectedColor;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, sceneWidth, sceneHeight);
    
    // Set composite mode to mask with t-shirt
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(baseProductImage, 0, 0, sceneWidth, sceneHeight);
    
    // Create image from canvas
    const img = new window.Image();
    img.src = canvas.toDataURL();
    img.onload = () => setColorOverlayImage(img);
  }, [baseProductImage, selectedColor, sceneWidth, sceneHeight]);

  return colorOverlayImage;
};