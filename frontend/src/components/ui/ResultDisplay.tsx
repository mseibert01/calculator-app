import React from 'react';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  size?: 'small' | 'large';
  variant?: 'default' | 'positive' | 'negative';
  context?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  size = 'small',
  variant = 'default',
  context
}) => {
  const sizeStyles = {
    small: 'text-2xl',
    large: 'text-5xl'
  };

  const variantStyles = {
    default: 'text-gray-900 dark:text-gray-100',
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="text-center p-4">
      <div className={`font-bold ${sizeStyles[size]} ${variantStyles[variant]} mb-2`}>
        {value}
      </div>
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </div>
      {context && (
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {context}
        </div>
      )}
    </div>
  );
};
