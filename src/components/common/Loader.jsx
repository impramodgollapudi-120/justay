import React from 'react';

export const Loader = ({ message = 'Curating your luxury experience...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      <p className="text-red-900/70 text-sm font-semibold">{message}</p>
    </div>
  );
};

export default Loader;
