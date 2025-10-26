
import React from 'react';
import type { AnalysisResult } from '../types';
import { IssueCard } from './IssueCard';
import { Spinner } from './Spinner';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4">
        <div className="h-10 bg-gray-700 rounded-md animate-pulse w-3/4"></div>
        <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
    </div>
)


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-400">Analyzing...</h2>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Analysis Complete</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Summary</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{result.summary_comment}</p>
      </div>

      {result.issues.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Detected Issues ({result.issues.length})</h3>
          <div className="space-y-4">
            {result.issues.map((issue, index) => (
              <IssueCard key={index} issue={issue} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
