
export enum Severity {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Issue {
  file: string;
  line: number;
  type: string;
  severity: Severity;
  description: string;
  suggested_fix: string;
}

export interface AnalysisResult {
  issues: Issue[];
  summary_comment: string;
}
