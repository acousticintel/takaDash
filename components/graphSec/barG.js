import { useState } from "react";
import dynamic from "next/dynamic";

export default function BarG({ data }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  return (
    <div className=" relative h-full">
      <div className="mixed-chart">
        {typeof window !== "undefined" && data?.options && data?.series && (
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="100%"
          />
        )}
      </div>
    </div>
  );
}
