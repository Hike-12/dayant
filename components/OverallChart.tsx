import { RunnerData } from "@/types/runnerData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface OverallChartProps {
  data: RunnerData[];
}

export function OverallChart({ data }: OverallChartProps) {
  // Aggregate data by date
  const aggregatedData = data.reduce((acc, curr) => {
    const dateStr = curr.date.toLocaleDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = 0;
    }
    acc[dateStr] += curr.miles;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(aggregatedData).map(([date, miles]) => ({
    date,
    miles: parseFloat(miles.toFixed(2)),
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card className="rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold tracking-tight">Total Miles Run per Date</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{fill: 'hsl(var(--muted))'}}
            />
            <Legend />
            <Bar dataKey="miles" fill="hsl(var(--accent-brand))" radius={[4, 4, 0, 0]} name="Total Miles" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
