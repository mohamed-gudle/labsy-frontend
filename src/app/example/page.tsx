"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TShirtColorPreview = () => {
    // Available colors with their names and hex values
    const colors = [
        { name: "White", value: "#FFFFFF", mixBlendMode: "normal" },
        { name: "Black", value: "#000000", mixBlendMode: "multiply" },
        { name: "Navy Blue", value: "#1e3a8a", mixBlendMode: "multiply" },
        { name: "Forest Green", value: "#166534", mixBlendMode: "multiply" },
        { name: "Crimson Red", value: "#dc2626", mixBlendMode: "multiply" },
        { name: "Royal Purple", value: "#7c3aed", mixBlendMode: "multiply" },
        { name: "Orange", value: "#ea580c", mixBlendMode: "multiply" },
        { name: "Hot Pink", value: "#ec4899", mixBlendMode: "multiply" },
        { name: "Gray", value: "#6b7280", mixBlendMode: "multiply" },
        { name: "Brown", value: "#92400e", mixBlendMode: "multiply" },
    ];

    const [selectedColor, setSelectedColor] = useState(colors[0]);

    // You can replace this with your actual t-shirt image URL
    const tshirtImageUrl = "/tshirt.png";
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        T-Shirt Color Preview
                    </CardTitle>
                    <p className="text-center text-gray-600">
                        Select a color to preview how the t-shirt will look
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* T-Shirt Preview */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative w-80 h-96 bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    {/* Base t-shirt image */}
                                    <Image
                                        src={tshirtImageUrl}
                                        alt="T-Shirt"
                                        className="w-full h-full object-contain"
                                        width={320}
                                        height={384}
                                        priority
                                    />

                                    {/* Color overlay */}
                                    {selectedColor.name !== "White" && (
                                        <div
                                            className="absolute inset-0 w-full h-full"
                                            style={{
                                                backgroundColor: selectedColor.value,
                                                mixBlendMode: selectedColor.mixBlendMode as React.CSSProperties['mixBlendMode'],
                                                opacity: selectedColor.name === "Black" ? 0.8 : 0.7,
                                                WebkitMaskImage: `url(${tshirtImageUrl})`,
                                                maskImage: `url(${tshirtImageUrl})`,
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskSize: 'contain',
                                                maskSize: 'contain',
                                                WebkitMaskPosition: 'center',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-semibold">{selectedColor.name}</h3>
                                <p className="text-sm text-gray-500">{selectedColor.value}</p>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Available Colors:</h3>

                            <div className="grid grid-cols-2 gap-3">
                                {colors.map((color) => (
                                    <Button
                                        key={color.name}
                                        variant={
                                            selectedColor.name === color.name ? "default" : "outline"
                                        }
                                        className="flex items-center justify-start gap-3 h-12 px-4"
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"
                                            style={{ backgroundColor: color.value }}
                                        />
                                        <span className="text-sm font-medium">{color.name}</span>
                                    </Button>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    How to use:
                                </h4>
                                <ol className="text-sm text-blue-800 space-y-1">
                                    <li>
                                        1. Replace the placeholder image with your white t-shirt PNG
                                    </li>
                                    <li>2. Ensure your image has a transparent background</li>
                                    <li>
                                        3. Customize the color palette to match your inventory
                                    </li>
                                    <li>
                                        4. The component uses CSS blend modes for realistic coloring
                                    </li>
                                </ol>
                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Integration Tips:
                                </h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Pass your t-shirt image URL as a prop</li>
                                    <li>• Connect color selection to your cart/order system</li>
                                    <li>• Add inventory status for each color</li>
                                    <li>• Consider adding size selection alongside colors</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TShirtColorPreview;
