import React, { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw, X } from 'lucide-react';
import { useSharedData } from '../../context/SharedDataContext';

export const ProfileProgress: React.FC = () => {
  const { flowProgress, isFlowComplete, resetFlow, dismissFlow } = useSharedData();
  const [showMenu, setShowMenu] = useState(false);

  if (flowProgress.dismissed && isFlowComplete) return null;

  const totalSteps = 4;
  const completedCount = flowProgress.completedSteps.length;
  const progressPercent = (completedCount / totalSteps) * 100;

  const handleResetFlow = () => {
    if (confirm('Are you sure you want to reset your financial profile? All data will be cleared.')) {
      resetFlow();
      setShowMenu(false);
    }
  };

  const handleDismissFlow = () => {
    dismissFlow();
    setShowMenu(false);
  };

  if (completedCount === 0 && flowProgress.dismissed) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-1">
          {completedCount > 0 ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {isFlowComplete ? 'Profile Complete' : `${completedCount}/${totalSteps}`}
          </span>
        </div>
        {!isFlowComplete && (
          <div className="hidden sm:block w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
            <button
              onClick={handleResetFlow}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Profile
            </button>
            {!flowProgress.dismissed && (
              <button
                onClick={handleDismissFlow}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Dismiss Flow
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
