import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  style
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-xl shadow-lg
        p-6
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};
