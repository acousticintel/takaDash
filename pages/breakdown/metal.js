import React from "react";
import { AuthGuard } from "../../components/elements/authGuard";
import BarG from "../../components/graphSec/barG";

export default function PlasticBreakdown() {
  const metalData = [
    {
      name: "Aluminium foil",
      data: [23, 23, 25, 27],
    },
    {
      name: "Metal can",
      data: [215, 218, 219, 222],
    },
  ];
  const metalWData = {
    series: metalData,
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
        text: "Metal Sorting Analysis (Weight)",
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
  const metalPData = {
    series: metalData,
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
        text: "Metal Sorting Analysis (Proportion)",
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
        <h1>Metal Recycling</h1>
        <p>
          The metal recycling process is similar to the usual recycling process.
          The metals are first sorted on the basis or their properties. It is,
          however, important to have a basic understanding or knowledge about
          metals. This will help in recycling them and keeping a green
          environment.
        </p>
        <section>
          <BarG data={metalWData} />
          <BarG data={metalPData} />
        </section>
      </main>
    </AuthGuard>
  );
}
