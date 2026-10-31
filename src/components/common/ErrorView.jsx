import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const ErrorView = ({ message = 'Something went wrong while loading data.', onRetry }) => {
  return (
    <div className="bg-red-50/50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto text-center my-8">
      <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
      <h4 className="text-lg font-semibold text-red-900 mb-1">Unable to Load</h4>
      <p className="text-red-700 text-sm mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorView;
