"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PricingRegion {
    id: string;
    label: string;
    currency: string;
    symbol: string;
}

interface PricingSectionProps {
    regions?: PricingRegion[];
    baseCost?: number;
    onPriceChange?: (regionId: string, price: number) => void;
    title?: string;
    subtitle?: string;
    className?: string;
}

const defaultRegions: PricingRegion[] = [
    { id: 'usa', label: 'USA', currency: 'USD', symbol: '$' },
    { id: 'eur', label: 'EUR', currency: 'EUR', symbol: '€' },
];

/**
 * Pricing section component
 * Allows users to set retail prices for different regions
 */
export const PricingSection = ({
    regions = defaultRegions,
    baseCost = 15.90,
    onPriceChange,
    title = "Set your pricing",
    subtitle = "Enter your desired retail price for fans from different regions",
    className = ""
}: PricingSectionProps) => {
    const [selectedRegion, setSelectedRegion] = useState(regions[0]?.id || 'usa');
    const [prices, setPrices] = useState<Record<string, number>>({
        usa: 22.99,
        eur: 21.99,
    });

    const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0];
    const currentPrice = prices[selectedRegion] || 0;
    const profit = Math.max(0, currentPrice - baseCost);

    const handlePriceChange = (value: string) => {
        const numericValue = parseFloat(value) || 0;
        setPrices(prev => ({
            ...prev,
            [selectedRegion]: numericValue
        }));
        onPriceChange?.(selectedRegion, numericValue);
    };

    return (
        <div className={`mb-8 ${className}`}>
            <h3 className="text-sm font-medium mb-3">{title}</h3>
            <p className="text-xs text-gray-500 mb-3">{subtitle}</p>

            {/* Region selector */}
            <div className="flex gap-2 mb-3">
                {regions.map((region) => (
                    <Button
                        key={region.id}
                        variant={selectedRegion === region.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRegion(region.id)}
                        className={`rounded-full text-sm ${selectedRegion === region.id
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-50'
                            }`}
                    >
                        {region.label}
                    </Button>
                ))}
            </div>

            {/* Price input and profit display */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {currentRegion.symbol}
                    </span>
                    <Input
                        type="number"
                        value={currentPrice.toFixed(2)}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="pl-8 w-24"
                        min="0"
                        step="0.01"
                    />
                </div>
                <span className="text-sm text-gray-500">
                    {currentRegion.symbol}{profit.toFixed(2)} Profit/Sale
                </span>
            </div>

            {/* Additional pricing info */}
            <div className="mt-2 text-xs text-gray-400">
                Base cost: {currentRegion.symbol}{baseCost.toFixed(2)}
            </div>
        </div>
    );
};
