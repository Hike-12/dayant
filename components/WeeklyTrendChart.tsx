import { RunnerData } from "@/types/runnerData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

interface WeeklyTrendChartProps {
  data: RunnerData[];
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  // Group data by week
  const getWeekNumber = (date: Date): string => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return `Week ${weekNumber}`;
  };

  const weeklyData = data.reduce((acc, curr) => {
    const week = getWeekNumber(curr.date);
    if (!acc[week]) {
      acc[week] = { week, totalMiles: 0, runCount: 0 };
    }
    acc[week].totalMiles += curr.miles;
    acc[week].runCount += 1;
    return acc;
  }, {} as Record<string, { week: string; totalMiles: number; runCount: number }>);

  const chartData = Object.values(weeklyData)
    .map((item) => ({
      week: item.week,
      miles: parseFloat(item.totalMiles.toFixed(2)),
      runs: item.runCount,
    }))
    .sort((a, b) => {
      const aNum = parseInt(a.week.replace("Week ", ""));
      const bNum = parseInt(b.week.replace("Week ", ""));
      return aNum - bNum;
    });

  return (
    <Card className="rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold tracking-tight">Weekly Running Trends</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMiles" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent-brand))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent-brand))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="week"
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
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                borderColor: 'hsl(var(--border))', 
                color: 'hsl(var(--popover-foreground))', 
                borderRadius: 'var(--radius)' 
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="miles" 
              stroke="hsl(var(--accent-brand))" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMiles)"
              name="Total Miles" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
