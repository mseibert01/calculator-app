import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface SuggestionCardProps {
  title: string;
  description: string;
  action: string;
  calculator: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'highlighted';
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  title,
  description,
  action,
  calculator,
  icon,
  variant = 'default'
}) => {
  const navigate = useNavigate();

  const baseClasses = "p-6 rounded-lg border transition-all duration-200 hover:shadow-lg";
  const variantClasses = variant === 'highlighted'
    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
          <Button
            onClick={() => navigate(calculator)}
            variant={variant === 'highlighted' ? 'primary' : 'secondary'}
            className="inline-flex items-center gap-2"
          >
            {action}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface SuggestionsSectionProps {
  suggestions: Array<Omit<SuggestionCardProps, 'variant'>>;
  title?: string;
}

export const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({
  suggestions,
  title = "Related Calculators"
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            {...suggestion}
            variant={index === 0 ? 'highlighted' : 'default'}
          />
        ))}
      </div>
    </div>
  );
};
