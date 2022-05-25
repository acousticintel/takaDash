import { useState } from "react";
import dynamic from "next/dynamic";

export default function PieG({ values, labels }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [data, setData] = useState({
    series: values,
    options: {
      chart: {
        type: "pie",
      },
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: false,
      },
      labels,
    },
  });

  return (
    <div className=" relative h-full">
      <div className="mixed-chart">
        {typeof window !== "undefined" && (
          <Chart
            options={data.options}
            series={data.series}
            type="pie"
            width="100%"
            height="200"
          />
        )}
      </div>
    </div>
  );
}
