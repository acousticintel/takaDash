//custom
import { useData } from "../../context/dataContext";

export default function Stats() {
  const { users, requests, onSetSelRequest } = useData();
  return (
    <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat">
        <h6>Total Waste</h6>
        <h5>2000 kg</h5>
      </div>
      <div className="stat">
        <h6>Recyclable Waste</h6>
        <h5>1940 kg</h5>
      </div>
      <div className="stat">
        <h6>Non Recyclable Waste</h6>
        <h5>60 kg</h5>
      </div>
      <div className="stat">
        <h6>Landfill diversion rate</h6>
        <h5>97%</h5>
      </div>
    </div>
  );
}
