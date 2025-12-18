import { RunnerData, Metrics, PersonMetrics } from "@/types/runnerData";

export function calculateMetrics(data: RunnerData[]): Metrics {
  if (data.length === 0) {
    return { averageMiles: 0, minMiles: 0, maxMiles: 0 };
  }

  const miles = data.map((d) => d.miles);
  const totalMiles = miles.reduce((a, b) => a + b, 0);
  const minMiles = Math.min(...miles);
  const maxMiles = Math.max(...miles);
  const averageMiles = totalMiles / miles.length;

  return {
    averageMiles: parseFloat(averageMiles.toFixed(2)),
    minMiles: parseFloat(minMiles.toFixed(2)),
    maxMiles: parseFloat(maxMiles.toFixed(2)),
  };
}

export function calculatePersonMetrics(data: RunnerData[]): PersonMetrics[] {
  const personMap = new Map<string, RunnerData[]>();

  data.forEach((d) => {
    if (!personMap.has(d.person)) {
      personMap.set(d.person, []);
    }
    personMap.get(d.person)!.push(d);
  });

  const metrics: PersonMetrics[] = [];

  personMap.forEach((personData, person) => {
    const m = calculateMetrics(personData);
    metrics.push({
      person,
      ...m,
    });
  });

  return metrics;
}
