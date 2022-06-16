import React from "react";
import { AuthGuard } from "../../components/elements/authGuard";
import BarG from "../../components/graphSec/barG";

export default function PlasticBreakdown() {
  const elecData = [
    {
      name: "Phones",
      data: [2, 0, 3, 0],
    },
    {
      name: "Laptops/PC",
      data: [0, 2, 3, 1],
    },
    {
      name: "Home Appliances",
      data: [5, 1, 2, 3],
    },
    {
      name: "Other",
      data: [3, 5, 6, 10],
    }
  ];
  const elecWData = {
    series: elecData,
    options: {
      chart: {
        height: "100%",
        type: "bar",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Electronics Sorting Analysis (Weight)",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"],
        labels: {
          formatter: function (val) {
            return val + "Kg";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "Kg";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
  const elecPData = {
    series: elecData,
    options: {
      chart: {
        height: "100%",
        type: "bar",
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Electronics Sorting Analysis (Proportion)",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "Kg";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  return (
    <AuthGuard>
      <main className="breakdown__page">
        <h1>Electronics Recycling</h1>
        <p>
          Recycling electronics is an often challenging activity. This is
          because e-scraps are typically sophisticated and manufactured from
          diverse elements such as metals, plastics, and glass. While this
          process often varies, there is a general process.
        </p>
        <section>
          <BarG data={elecWData} />
          <BarG data={elecPData} />
        </section>
      </main>
    </AuthGuard>
  );
}
