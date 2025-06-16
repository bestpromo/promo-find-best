
import { Progress } from "@/components/ui/progress";

interface CountdownProgressProps {
  progress: number;
}

export const CountdownProgress = ({ progress }: CountdownProgressProps) => {
  return (
    <div className="w-full">
      <Progress value={progress} className="h-2 mb-4" />
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
    </div>
  );
};
