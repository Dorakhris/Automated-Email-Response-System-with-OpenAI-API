
import React from 'react';

interface WelcomeViewProps {
    message: string;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
      <svg className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <h2 className="text-xl font-semibold">{message}</h2>
      <p className="max-w-xs mt-2">Use the panel on the left to navigate your emails.</p>
    </div>
  );
};
