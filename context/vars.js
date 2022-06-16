export const points = [20, 40, 60, 80, 100];

export const routes = [
  { name: "Dashboard", route: "/" },
  {
    name: "Breakdown",
    route: "/breakdown",
    list: [
      { name: "Glass", route: "breakdown/glass" },
      { name: "Plastic", route: "breakdown/plastic" },
      { name: "Metal", route: "breakdown/metal" },
      { name: "Paper", route: "breakdown/paper" },
      { name: "Electronics", route: "breakdown/electronics" },
      { name: "Non Recyclable", route: "breakdown/nonrecycle" },
    ],
  },
  { name: "History", route: "/history" },
  { name: "Entry", route: "/entry" , protect: true},
  { name: "Sign Out", route: "/" },
];