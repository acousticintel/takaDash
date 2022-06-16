import React from "react";
import { AuthGuard } from "../../components/elements/authGuard";
import BarG from "../../components/graphSec/barG";

export default function PlasticBreakdown() {
  const plasticData = [
    {
      name: "PET",
      data: [130, 142, 141, 145],
    },
    {
      name: "LDPE",
      data: [29, 32, 33, 41],
    },
    {
      name: "HDPE",
      data: [51, 53, 54, 56],
    },
    {
      name: "PP",
      data: [95, 99, 108, 111],
    },
    {
      name: "PS",
      data: [30, 38, 35, 37],
    },
  ];
  const plasticWData = {
    series: plasticData,
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
        text: "Plastic Sorting Analysis (Weight)",
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
  const plasticPData = {
    series: plasticData,
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
        text: "Plastic Sorting Analysis (Proportion)",
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
            return val + "kg";
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
        <h1>Plastic Recycling</h1>
        <p>
          Presently, almost all recycling is performed by remelting and
          reforming used plastic into new items; so-called mechanical recycling.
          This can cause polymer degradation at a chemical level, and also
          requires that waste be sorted by both colour and polymer type before
          being reprocessed, which is complicated and expensive. Failures in
          this can lead to material with inconsistent properties, rendering it
          unappealing to industry.
        </p>
        <section>
          <BarG data={plasticWData} />
          <BarG data={plasticPData} />
        </section>
      </main>
    </AuthGuard>
  );
}
