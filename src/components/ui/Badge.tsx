import React from 'react';

interface BadgeProps {
    variant?: 'success' | 'warning' | 'info' | 'danger';
    size?: 'sm' | 'md';
    children: React.ReactNode;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'info',
    size = 'sm',
    children,
    className = ''
}) => {
    const baseClasses = 'inline-flex items-center font-medium uppercase rounded';
    
    const variantClasses = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-blue-100 text-blue-800',
        danger: 'bg-red-100 text-red-800'
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm'
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
        <span className={combinedClasses}>
            {children}
        </span>
    );
};