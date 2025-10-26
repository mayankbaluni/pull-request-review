
import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface DiffInputProps {
  onAnalyze: (diffText: string) => void;
  isLoading: boolean;
  exampleDiff: string;
}

export const DiffInput: React.FC<DiffInputProps> = ({ onAnalyze, isLoading, exampleDiff }) => {
  const [diffText, setDiffText] = useState<string>('');

  const handleAnalyzeClick = () => {
    onAnalyze(diffText);
  };
  
  const handleUseExample = () => {
    setDiffText(exampleDiff);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <label htmlFor="diff-input" className="block text-lg font-semibold mb-2 text-gray-300">
        Paste Your Code Diff Here
      </label>
      <textarea
        id="diff-input"
        value={diffText}
        onChange={(e) => setDiffText(e.target.value)}
        placeholder="--- a/file.js
+++ b/file.js
@@ -1,3 +1,4 @@
 console.log('hello');
+console.log('world');"
        className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-md text-gray-200 font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleUseExample}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-all disabled:opacity-50"
        >
          Load Example
        </button>
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Spinner />
              Analyzing...
            </>
          ) : (
            'Analyze Diff'
          )}
        </button>
      </div>
    </div>
  );
};
