"use client";

import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';

export interface ProductListItemProps {
  image: string;
  title: string;
  brand: string;
  price: string;
  country: string;
  fulfillmentTime: string;
  colors: string[]; // hex color values
  selectedColor: string;
  onColorSelect?: (color: string) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  image,
  title,
  brand,
  price,
  country,
  fulfillmentTime,
  colors,
  selectedColor,
  onColorSelect,
}) => (
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
      <span className="text-sm text-blue-600 font-semibold mt-1">{price}</span>
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
    <div className="flex items-center gap-2 mt-2">
      {colors.map((color) => (
        <Button
          key={color}
          type="button"
          size="icon"
          variant="ghost"
          className={`w-6 h-6 rounded-full border-2 ${
            selectedColor === color ? 'border-gray-900' : 'border-gray-200'
          } p-0 flex items-center justify-center`}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
          onClick={() => onColorSelect?.(color)}
        >
          {selectedColor === color && (
            <span className="block w-2.5 h-2.5 rounded-full border border-white bg-white" />
          )}
        </Button>
      ))}
    </div>
  </Card>
);
