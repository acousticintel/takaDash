import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function LineG({ events }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [dynamicData, setDynamicData] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      let chartD = [];
      events.map((event) => {
        Object.entries(event).map(([key, value]) => {
          if (
            key !== "location" &&
            key !== "timestamp" &&
            key !== "image" &&
            key !== "total" &&
            key !== "id"
          ) {
            chartD.push({
              name: key,
              data: value,
            });
          }
        });
      });
      console.log(chartD);

      const newList = chartD.reduce((items, item) => {
        const { name, data } = item;
        const itemIndex = items.findIndex((item) => item.name === name);
        if (itemIndex === -1) {
          item.data = [0, data];
          items.push(item);
        } else {
          items[itemIndex].data = [...items[itemIndex].data, data];
        }

        return items;
      }, []);

      console.log(newList);
      setDynamicData(newList);
    }
  }, [events]);

  const data = {
    series: dynamicData,
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
  };

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
