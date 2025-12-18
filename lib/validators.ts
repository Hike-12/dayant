import { RawCsvRow, RunnerData } from "@/types/runnerData";

export const REQUIRED_HEADERS = ["date", "person", "miles run"];

export function validateHeaders(headers: string[]): string[] {
  const errors: string[] = [];
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h));
  if (missing.length > 0) {
    errors.push(`Missing required headers: ${missing.join(", ")}`);
  }
  return errors;
}

export function validateRow(row: RawCsvRow, index: number): { data: RunnerData | null; errors: string[] } {
  const errors: string[] = [];
  const rowNum = index + 2; // 1-based index, +1 for header

  // Validate Date
  const dateStr = row.date ? row.date.trim() : "";
  let date = new Date(dateStr);
  
  if (!dateStr) {
    errors.push(`Row ${rowNum}: Date is missing`);
  } else if (isNaN(date.getTime())) {
    errors.push(`Row ${rowNum}: Invalid date format '${dateStr}'`);
  }

  // Validate Person
  const person = row.person ? row.person.trim() : "";
  if (!person) {
    errors.push(`Row ${rowNum}: Person name is missing`);
  }

  // Validate Miles
  const milesStr = row["miles run"] ? row["miles run"].toString().trim() : "";
  let miles = parseFloat(milesStr);
  
  if (!milesStr && milesStr !== "0") {
     errors.push(`Row ${rowNum}: Miles run is missing`);
  } else if (isNaN(miles) || miles < 0) {
    errors.push(`Row ${rowNum}: Invalid miles value '${milesStr}'. Must be a non-negative number.`);
  }

  if (errors.length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      date,
      person,
      miles,
    },
    errors: [],
  };
}
