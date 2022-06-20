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
            key !== "name" &&
            key !== "location" &&
            key !== "timestamp" &&
            key !== "image" &&
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

      //sort new list by name
      const sortedList = newList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      //console.log(sortedList);
      setDynamicData(sortedList);
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
        "#fb923c",
        "#14b8a6",
        "#facc15",  
        "#ef4444",
        "#6b7280",  
        "#38bdf8",
        "#fb923c",
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
