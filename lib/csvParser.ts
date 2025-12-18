import Papa from "papaparse";
import { RawCsvRow, ValidationResult, RunnerData } from "@/types/runnerData";
import { validateHeaders, validateRow } from "./validators";

export function parseCsv(file: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const errors: string[] = [];
        const data: RunnerData[] = [];

        // Validate Headers
        if (results.meta.fields) {
            const headerErrors = validateHeaders(results.meta.fields);
            if (headerErrors.length > 0) {
                resolve({ isValid: false, data: [], errors: headerErrors });
                return;
            }
        } else {
             resolve({ isValid: false, data: [], errors: ["Could not parse CSV headers."] });
             return;
        }

        // Validate Rows
        results.data.forEach((row: any, index: number) => {
            // PapaParse might return empty objects for empty lines if skipEmptyLines is not perfect, check keys
            if (Object.keys(row).length === 0) return;

            const { data: validRow, errors: rowErrors } = validateRow(row as RawCsvRow, index);
            if (rowErrors.length > 0) {
                errors.push(...rowErrors);
            } else if (validRow) {
                data.push(validRow);
            }
        });

        if (errors.length > 0) {
            resolve({ isValid: false, data: [], errors });
        } else {
            resolve({ isValid: true, data, errors: [] });
        }
      },
      error: (error) => {
        resolve({ isValid: false, data: [], errors: [error.message] });
      }
    });
  });
}
