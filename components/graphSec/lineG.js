import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function LineG({ events }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  useEffect(() => {
    if (events.length > 0) {
      let chartD = [];
      events.map((event) => {
        Object.entries(event).map(([key, value]) => {
          if (key !== "timestamp" && key !== "image" && key !== "id" && key !== "location") {
            chartD.push({
              name: key,
              data: value,
            });
          }
        });
      });
    }
  }, [events]);

  const [data, setData] = useState({
    series: [
      {
        name: "Glass",
        data: [0, 50, 45],
      },
      {
        name: "Plastic",
        data: [0, 11, 32],
      },
      {
        name: "Metal",
        data: [0, 5, 20],
      },
      {
        name: "Paper",
        data: [0, 5, 20],
      },
      {
        name: "Electronics",
        data: [0, 0, 0],
      },
      {
        name: "Organic",
        data: [0, 1, 5],
      },
      {
        name: "Non-Recyclables",
        data: [0, 5, 3],
      },
    ],
    options: {
      title: {
        text: "Total Waste Collected by Category",
      },
      chart: {
        height: "100%",
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        "#14b8a6",
        "#f97316",
        "#facc15",
        "#3b82f6",
        "#a855f7",
        "#64748b",
        "#ef4444",
      ],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Apr", "May", "Jun"],
      },
      tooltip: {
        x: {
          format: "MMM",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: 40,
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
            height="350px"
          />
        )}
      </div>
    </div>
  );
}
