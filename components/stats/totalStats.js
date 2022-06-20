export default function TotalStats({ total, non }) {
  const getPercentage = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e2") + "e-2")
      ? Number(Math.round((a / b) * 100 + "e2") + "e-2")
      : 0;
  };
  return (
    <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat">
        <h6>Total Waste</h6>
        <h5>{total ? total : 0} kg</h5>
      </div>
      <div className="stat">
        <h6>Recyclable Waste</h6>
        <h5>{(total ? total : 0) - (non ? non : 0)} kg</h5>
      </div>
      <div className="stat">
        <h6>Non Recyclable Waste</h6>
        <h5>{non ? non : 0} kg</h5>
      </div>
      <div className="stat">
        <h6>Landfill diversion rate</h6>
        <h5>{getPercentage((total ? total : 0) - (non ? non : 0), total)}%</h5>
      </div>
    </div>
  );
}
