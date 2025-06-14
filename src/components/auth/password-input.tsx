"use client";

import { useState, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    autoComplete?: string;
    minLength?: number;
    'aria-describedby'?: string;
}

/**
 * Password input component with show/hide toggle
 * Provides secure password input with visibility toggle functionality
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
    id,
    name = "password",
    placeholder = "Enter your password",
    required = false,
    value,
    onChange,
    className = "",
    disabled = false,
    autoComplete = "current-password",
    minLength,
    'aria-describedby': ariaDescribedBy,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                ref={ref}
                id={id}
                name={name}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                required={required}
                className={`pr-10 ${className}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autoComplete}
                minLength={minLength}
                aria-describedby={ariaDescribedBy}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-2 h-full"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={disabled}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                )}
            </Button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
