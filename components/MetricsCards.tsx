import { Metrics } from "@/types/runnerData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MetricsCardsProps {
  metrics: Metrics;
  title?: string;
}

export function MetricsCards({ metrics, title = "Overall Metrics" }: MetricsCardsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-serif font-semibold tracking-tight">{title}</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.div variants={item} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <Card className="h-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Average Miles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-4xl font-bold font-serif text-accent-brand">{metrics.averageMiles}</div>
              <p className="text-sm text-muted-foreground">per run</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <Card className="h-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Minimum Miles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-4xl font-bold font-serif text-foreground">{metrics.minMiles}</div>
              <p className="text-sm text-muted-foreground">shortest run</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <Card className="h-full rounded-xl border-0 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Maximum Miles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-4xl font-bold font-serif text-foreground">{metrics.maxMiles}</div>
              <p className="text-sm text-muted-foreground">longest run</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
