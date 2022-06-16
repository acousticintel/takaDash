import React from "react";
import { AuthGuard } from "../../components/elements/authGuard";
import BarG from "../../components/graphSec/barG";

export default function GlassBreakdown() {
  const nonrecData = [
    {
      name: "Organic",
      data: [85, 90, 92, 93],
    },
    {
      name: "Non recyclable",
      data: [85, 90, 92, 93],
    },
  ];
  const nonrecWData = {
    series: nonrecData,
    options: {
      chart: {
        height: "96em",
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
        text: "Non Recyclable & Organic Sorting Analysis (Weight)",
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
  const nonrecPData = {
    series: nonrecData,
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
        text: "Non Recyclable & Organic Sorting Analysis (Proportion)",
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
        <h1>Non Recyclable Waste</h1>
        <p>
          Garbage, Food waste, Food-tainted items (such as: used paper plates or
          boxes, paper towels, or paper napkins), Ceramics and kitchenware,
          Windows and mirrors, Plastic wrap, Packing peanuts and bubble wrap,
          Wax boxes, Photographs, Medical waste, Polystyrene or styrofoam,
          Hazardous chemicals and chemical containers, Plastic toys or sporting
          goods equipment, Foam egg cartons, Wood, Light bulbs, Yard waste,
          garden tools.
        </p>
        <section>
          <BarG data={nonrecWData} />
          <BarG data={nonrecPData} />
        </section>
      </main>
    </AuthGuard>
  );
}
