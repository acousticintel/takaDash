import { useState } from "react";
import dynamic from "next/dynamic";

export default function LineG() {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [data, setData] = useState({
    series: [
      {
        name: "Plastic",
        data: [50, 45, 63, 78, 75, 62, 80],
      },
      {
        name: "Glass",
        data: [11, 32, 45, 35, 47, 52, 61],
      },
      {
        name: "Electronics",
        data: [5, 20, 8, 15, 30, 18, 41],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
        ],
      },
      tooltip: {
        x: {
          format: "MMM",
        },
      },
    },
  });

  return (
    <div className=" relative h-full">
      <div className="mixed-chart">
        {typeof window !== "undefined" && (
          <Chart
            options={data.options}
            series={data.series}
            type="area"
            width="100%"
          />
        )}
      </div>
    </div>
  );
};
