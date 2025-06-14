"use client";

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React from 'react';

interface BaseProductSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

/**
 * Search component for filtering base products
 * Provides real-time search functionality with debouncing
 */
export const BaseProductSearch: React.FC<BaseProductSearchProps> = ({
    value,
    onChange,
    placeholder = "Search products...",
    className = "",
}) => {
    return (
        <div className={`relative ${className}`}>
            <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
            />
        </div>
    );
};
