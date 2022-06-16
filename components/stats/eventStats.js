//custom
import { useData } from "../../context/dataContext";

export default function EventsStats({total}) {
  const { users, requests, onSetSelRequest } = useData();
  return (
    <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat">
        <h6>Total Users</h6>
        <h5>324</h5>
      </div>
      <div className="stat">
        <h6>Total Waste</h6>
        <h5>{total} kg</h5>
      </div>
      <div className="stat">
        <h6>Incentives</h6>
        <h5>Ksh 0</h5>
      </div>
      <div className="stat">
        <h6>Redeemed Sales</h6>
        <h5>Ksh 0</h5>
      </div>
    </div>
  );
}
