"use client";

import { Progress } from "@nextui-org/react";

interface ProgressBarProps {
  completed: number; // The percentage of completion
  total: number; // Total possible value (100 for full progress bar)
}

const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  return (
    <div className="mb-4">
      <Progress
        value={completed} // This sets the progress value (percentage)
        maxValue={total} // Max value is set to 100
        color="success" // Color of the progress bar (optional)
        size="lg" // Size of the progress bar
        aria-label="Bible reading progress"
      />
      <div className="text-center mt-2">{completed}%</div>{" "}
      {/* Show percentage */}
    </div>
  );
};

export default ProgressBar;
