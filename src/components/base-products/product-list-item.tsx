"use client";

import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { BaseItem } from '@/lib/types/base-products';

/**
 * Product list item component for displaying base products
 * Shows product details including image, pricing, colors, and sizing information
 */
export const ProductListItem: React.FC<BaseItem> = ({
    id,
    title,
    image,
    brand,
    colors,
    country,
    fulfillmentTime,
    available_sizes,
    print_areas,
    base_cost,
}) => {
    return (
        <Card className="w-full max-w-xs p-4 flex flex-col gap-3 rounded-xl shadow-sm border border-gray-100 bg-white">
            <div className="w-full aspect-[1/1] relative rounded-lg overflow-hidden bg-gray-50">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-contain"
                    loading="lazy"
                    quality={90}
                    priority={false}
                />
            </div>
            <div className="flex flex-col gap-0.5">
                <h3 className="font-medium text-base text-gray-900 leading-tight">{title}</h3>
                <span className="text-xs text-gray-500">From {brand}</span>
                <span className="text-sm text-blue-600 font-semibold mt-1">
                    {base_cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
            </div>
            <hr className="my-2 border-gray-100" />
            <div className="flex flex-col gap-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-xs">{country}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs">{fulfillmentTime}</span>
                </div>
            </div>
            {/* Available colors display */}
            {colors && colors.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Colors:</span>
                    {colors.map((color, index) => (
                        <div
                            key={`${color}-${index}`}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                    ))}
                </div>
            )}
            <div className="mt-4">
                <Link href={`/editor/${id}`}>
                    <Button className="w-full">
                        Start Designing
                    </Button>
                </Link>
            </div>
            {/* Optionally show available sizes */}
            {available_sizes && Object.keys(available_sizes).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {Object.keys(available_sizes).map((size) => (
                        <span
                            key={size}
                            className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700 border border-gray-200"
                        >
                            {size}
                        </span>
                    ))}
                </div>
            )}
            {/* Optionally show print area info */}
            {print_areas && print_areas.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                    {print_areas.length} print area{print_areas.length > 1 ? 's' : ''}
                </div>
            )}
        </Card>
    );
};
