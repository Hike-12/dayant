import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PersonMetrics } from "@/types/runnerData";

interface RunnerComparisonChartProps {
  data: any[];
  personMetricsList: PersonMetrics[];
}

export function RunnerComparisonChart({ data, personMetricsList }: RunnerComparisonChartProps) {
  const chartData = personMetricsList.map((person) => ({
    name: person.person,
    avg: parseFloat(person.averageMiles),
    min: parseFloat(person.minMiles),
    max: parseFloat(person.maxMiles),
  })).sort((a, b) => b.avg - a.avg);

  return (
    <Card className="rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold tracking-tight">Runner Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical">
            <XAxis 
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                borderColor: 'hsl(var(--border))', 
                color: 'hsl(var(--popover-foreground))', 
                borderRadius: 'var(--radius)' 
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="avg" fill="hsl(var(--accent-brand))" radius={[0, 4, 4, 0]} name="Average" />
            <Bar dataKey="max" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Maximum" />
            <Bar dataKey="min" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} name="Minimum" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
