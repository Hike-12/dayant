import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorAlertProps {
  errors: string[];
}

export function ErrorAlert({ errors }: ErrorAlertProps) {
  if (errors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <Alert variant="destructive" className="rounded-xl border-0 bg-destructive/10 text-destructive">
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <AlertTitle className="font-semibold text-base">Validation Errors</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 max-h-32 overflow-y-auto mt-2 space-y-1 text-sm leading-relaxed" role="list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}
