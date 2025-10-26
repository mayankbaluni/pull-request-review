
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl font-bold text-teal-400">
          AI Pull Request Code Reviewer
        </h1>
        <p className="text-gray-400 mt-2">
          Paste a code diff below to get an instant, AI-powered code review.
        </p>
      </div>
    </header>
  );
};
