import { RunnerData } from "@/types/runnerData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PersonChartProps {
  data: RunnerData[];
  person: string;
}

export function PersonChart({ data, person }: PersonChartProps) {
  const personData = data
    .filter((d) => d.person === person)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((d) => ({
      date: d.date.toLocaleDateString(),
      miles: d.miles,
    }));

  if (!person) {
      return null;
  }

  return (
    <Card className="rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold tracking-tight">Miles Run Over Time: {person}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={personData}>
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
            />
            <Legend />
            <Line type="monotone" dataKey="miles" stroke="hsl(var(--accent-brand))" strokeWidth={2} activeDot={{ r: 8 }} name="Miles Run" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
