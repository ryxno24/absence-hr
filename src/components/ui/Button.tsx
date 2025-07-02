import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'link' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseClasses = 'font-inherit cursor-pointer border transition-colors';
    
    const variantClasses = {
        link: 'bg-none border-none text-blue-600 underline p-0 hover:text-blue-800',
        primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700',
        secondary: 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:border-gray-300'
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base'
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${
        variant !== 'link' ? `${sizeClasses[size]} rounded` : ''
    } ${className}`.trim();

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};