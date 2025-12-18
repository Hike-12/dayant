"use client";

import React, { useState, useMemo } from "react";
import { RunnerData } from "@/types/runnerData";
import { parseCsv } from "@/lib/csvParser";
import { calculateMetrics, calculatePersonMetrics } from "@/lib/metrics";
import { CsvUploader } from "@/components/CsvUploader";
import { MetricsCards } from "@/components/MetricsCards";
import { OverallChart } from "@/components/OverallChart";
import { PersonChart } from "@/components/PersonChart";
import { DistributionChart } from "@/components/DistributionChart";
import { WeeklyTrendChart } from "@/components/WeeklyTrendChart";
import { RunnerComparisonChart } from "@/components/RunnerComparisonChart";
import { PersonSelector } from "@/components/PersonSelector";
import { ErrorAlert } from "@/components/ErrorAlert";
import { motion } from "framer-motion";

export function Dashboard() {
  const [data, setData] = useState<RunnerData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string>("");

  const handleUpload = async (file: File) => {
    setIsProcessing(true);
    setErrors([]);
    setData([]);
    setSelectedPerson("");

    try {
      const result = await parseCsv(file);
      if (result.isValid) {
        setData(result.data);
      } else {
        setErrors(result.errors);
      }
    } catch (e) {
      setErrors(["An unexpected error occurred during parsing."]);
    } finally {
      setIsProcessing(false);
    }
  };

  const overallMetrics = useMemo(() => calculateMetrics(data), [data]);
  const personMetricsList = useMemo(() => calculatePersonMetrics(data), [data]);
  const people = useMemo(() => personMetricsList.map((pm) => pm.person).sort(), [personMetricsList]);

  const selectedPersonMetrics = useMemo(() => {
    return personMetricsList.find((pm) => pm.person === selectedPerson);
  }, [personMetricsList, selectedPerson]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
          Runner Analytics
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Upload your running logs to visualize performance, track progress, and analyze metrics with precision.
        </p>
      </div>

      <CsvUploader onUpload={handleUpload} isProcessing={isProcessing} />

      <ErrorAlert errors={errors} />

      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <MetricsCards metrics={overallMetrics} title="Overall Performance" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OverallChart data={data} />
            <DistributionChart data={data} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WeeklyTrendChart data={data} />
            <RunnerComparisonChart data={data} personMetricsList={personMetricsList} />
          </div>

          <div className="space-y-4 pt-6 border-t border-border/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-serif font-bold tracking-tight">Individual Breakdown</h2>
              <PersonSelector
                people={people}
                selectedPerson={selectedPerson}
                onSelect={setSelectedPerson}
              />
            </div>
            
            {selectedPerson && selectedPersonMetrics && (
               <motion.div 
                 key={selectedPerson}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.3 }}
                 className="space-y-8"
               >
                  <MetricsCards metrics={selectedPersonMetrics} title={`${selectedPerson}'s Stats`} />
                  <PersonChart data={data} person={selectedPerson} />
               </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
