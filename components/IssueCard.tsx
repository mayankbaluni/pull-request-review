
import React from 'react';
import type { Issue } from '../types';
import { Severity } from '../types';
import { AlertTriangleIcon, BugIcon, ShieldAlertIcon, ZapIcon, InfoIcon } from './Icons';

interface IssueCardProps {
  issue: Issue;
}

const severityConfig = {
  [Severity.High]: {
    bgColor: 'bg-red-900',
    borderColor: 'border-red-700',
    textColor: 'text-red-300',
    icon: <ShieldAlertIcon className="h-6 w-6 text-red-400" />,
  },
  [Severity.Medium]: {
    bgColor: 'bg-orange-900',
    borderColor: 'border-orange-700',
    textColor: 'text-orange-300',
    icon: <AlertTriangleIcon className="h-6 w-6 text-orange-400" />,
  },
  [Severity.Low]: {
    bgColor: 'bg-yellow-900',
    borderColor: 'border-yellow-700',
    textColor: 'text-yellow-300',
    icon: <InfoIcon className="h-6 w-6 text-yellow-400" />,
  },
};

const getIconForType = (type: string) => {
    const lowerType = type.toLowerCase();
    if(lowerType.includes('security')) return <ShieldAlertIcon className="h-5 w-5" />;
    if(lowerType.includes('logic') || lowerType.includes('bug')) return <BugIcon className="h-5 w-5" />;
    if(lowerType.includes('performance')) return <ZapIcon className="h-5 w-5" />;
    return <InfoIcon className="h-5 w-5" />;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const config = severityConfig[issue.severity] || severityConfig[Severity.Low];

  return (
    <div className={`rounded-lg border ${config.borderColor} ${config.bgColor} shadow-md overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">{config.icon}</div>
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h4 className="text-lg font-bold text-gray-100">{issue.type}</h4>
                <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                    <span className={`font-mono text-gray-300 bg-gray-700 px-2 py-1 rounded-md`}>
                        {issue.file}:{issue.line}
                    </span>
                    <span className={`capitalize font-semibold ${config.textColor} border ${config.borderColor} px-2 py-1 rounded-full text-xs`}>
                        {issue.severity}
                    </span>
                </div>
            </div>
            
            <p className="text-gray-300 mb-4">{issue.description}</p>

            <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
                <p className="text-sm font-semibold text-teal-400 mb-1">Suggested Fix</p>
                <p className="text-gray-400 text-sm font-mono whitespace-pre-wrap">{issue.suggested_fix}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
