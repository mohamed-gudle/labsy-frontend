"use client";

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface BaseProductFilterProps {
    categories?: FilterOption[];
    brands?: FilterOption[];
    priceRanges?: FilterOption[];
    onFilterChange?: (filters: Record<string, string[]>) => void;
    className?: string;
}

/**
 * Filter component for base products
 * Provides category, brand, and price range filtering
 */
export const BaseProductFilter: React.FC<BaseProductFilterProps> = ({
    categories = [],
    brands = [],
    priceRanges = [],
    onFilterChange,
    className = "",
}) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
        categories: [],
        brands: [],
        priceRanges: [],
    });

    const handleFilterToggle = (filterType: string, value: string) => {
        const updated = { ...selectedFilters };
        if (updated[filterType].includes(value)) {
            updated[filterType] = updated[filterType].filter(item => item !== value);
        } else {
            updated[filterType].push(value);
        }
        setSelectedFilters(updated);
        onFilterChange?.(updated);
    };

    const clearFilters = () => {
        const cleared = { categories: [], brands: [], priceRanges: [] };
        setSelectedFilters(cleared);
        onFilterChange?.(cleared);
    };

    return (
        <Card className={`p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-600" />
                    <h3 className="font-medium text-gray-900">Filters</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Clear All
                </Button>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.categories.includes(category.id)}
                                    onChange={() => handleFilterToggle('categories', category.id)}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">
                                    {category.label} {category.count && `(${category.count})`}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Brands</h4>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.brands.includes(brand.id)}
                                    onChange={() => handleFilterToggle('brands', brand.id)}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">
                                    {brand.label} {brand.count && `(${brand.count})`}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Price Ranges */}
            {priceRanges.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
                    <div className="space-y-2">
                        {priceRanges.map((range) => (
                            <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.priceRanges.includes(range.id)}
                                    onChange={() => handleFilterToggle('priceRanges', range.id)}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">
                                    {range.label} {range.count && `(${range.count})`}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};
