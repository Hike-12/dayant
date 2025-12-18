import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

interface CsvUploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

export function CsvUploader({ onUpload, isProcessing }: CsvUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <label htmlFor="csv-upload" className="block cursor-pointer">
      <Card className="border-0 bg-card hover:shadow-lg transition-all duration-300 rounded-xl shadow-sm hover:scale-[1.01]">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-xl font-semibold tracking-tight">Upload Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full gap-4 py-6">
            <div className="p-3 rounded-full bg-accent-brand/5 text-accent-brand transition-all group-hover:scale-110">
              <UploadCloud className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2 text-center">
              <span className="text-base font-medium text-accent-brand hover:text-accent-brand/80 transition-colors">
                Click to Choose CSV File
              </span>
              <Input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isProcessing}
                className="hidden"
                aria-label="Upload CSV file"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Required columns: <code className="bg-muted px-2 py-1 rounded font-mono text-xs">date</code>, <code className="bg-muted px-2 py-1 rounded font-mono text-xs">person</code>, <code className="bg-muted px-2 py-1 rounded font-mono text-xs">miles run</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </label>
  );
}
