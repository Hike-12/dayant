export interface RawCsvRow {
  date: string;
  person: string;
  "miles run": string;
}

export interface RunnerData {
  date: Date;
  person: string;
  miles: number;
}

export interface ValidationResult {
  isValid: boolean;
  data: RunnerData[];
  errors: string[];
}

export interface Metrics {
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
}

export interface PersonMetrics extends Metrics {
  person: string;
}
