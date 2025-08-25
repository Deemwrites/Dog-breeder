
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-16 h-16 border-8 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
