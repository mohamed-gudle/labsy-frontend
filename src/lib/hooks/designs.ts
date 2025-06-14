import { useState, useCallback, useEffect, useRef } from 'react';
import { DesignState, PrintableArea, CanvasSize } from '@/lib/types/designs';

/**
 * Hook to manage design states across different print areas
 * Persists designs when switching between print areas
 */
export const useDesignStates = (printAreas: PrintableArea[] = []) => {
    // Store designs per print area - persists across print area switches
    const [designsByPrintArea, setDesignsByPrintArea] = useState<Record<number, DesignState[]>>({});
    const [currentPrintAreaIndex, setCurrentPrintAreaIndex] = useState<number>(0);

    // Get designs for current print area
    const currentDesigns = designsByPrintArea[currentPrintAreaIndex] || [];

    const addDesign = useCallback((design: DesignState) => {
        setDesignsByPrintArea(prev => ({
            ...prev,
            [currentPrintAreaIndex]: [...(prev[currentPrintAreaIndex] || []), design],
        }));
    }, [currentPrintAreaIndex]);

    const updateDesign = useCallback((index: number, updatedDesign: DesignState) => {
        setDesignsByPrintArea(prev => ({
            ...prev,
            [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.map((design, i) =>
                i === index ? updatedDesign : design
            ) || [],
        }));
    }, [currentPrintAreaIndex]);

    const removeDesign = useCallback((index: number) => {
        setDesignsByPrintArea(prev => ({
            ...prev,
            [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.filter((_, i) => i !== index) || [],
        }));
    }, [currentPrintAreaIndex]);

    const switchPrintArea = useCallback((newIndex: number) => {
        // Deselect all designs in current area before switching
        setDesignsByPrintArea(prev => ({
            ...prev,
            [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.map(design => ({
                ...design,
                isSelected: false
            })) || [],
        }));

        setCurrentPrintAreaIndex(newIndex);
    }, [currentPrintAreaIndex]);

    const clearCurrentArea = useCallback(() => {
        setDesignsByPrintArea(prev => ({
            ...prev,
            [currentPrintAreaIndex]: [],
        }));
    }, [currentPrintAreaIndex]);

    return {
        // Current state
        currentPrintAreaIndex,
        currentDesigns,
        currentPrintArea: printAreas[currentPrintAreaIndex],

        // Actions
        addDesign,
        updateDesign,
        removeDesign,
        switchPrintArea,
        clearCurrentArea,

        // All designs (for advanced use cases)
        allDesigns: designsByPrintArea,
    };
};

/**
 * Hook to create color overlay for products
 * Applies selected color as an overlay on the base product image
 */
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

/**
 * Hook to manage canvas size and scaling for design editor
 * Automatically adjusts canvas size based on container dimensions
 */
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
