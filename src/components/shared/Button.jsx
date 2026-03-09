import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1015] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:ring-indigo-500 border border-indigo-500/50',
        secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white shadow-sm focus:ring-gray-500 border border-gray-700/50 hover:border-gray-600',
        danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 focus:ring-red-500 border border-red-500/20',
        ghost: 'text-gray-400 hover:text-white hover:bg-white/10 focus:ring-gray-500',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500 border border-white/10',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        icon: 'p-2',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
