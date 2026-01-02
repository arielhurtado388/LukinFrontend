"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar({ porcentaje }: { porcentaje: number }) {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: porcentaje >= 100 ? "#dc2626" : "#f59e0b",
          trailColor: "#e1e1e1",
          textColor: porcentaje >= 100 ? "#dc2626" : "#f59e0b",
          textSize: 8,
        })}
        text={`${porcentaje}% Gastado`}
        value={porcentaje}
      />
    </div>
  );
}
