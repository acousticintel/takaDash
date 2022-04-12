//custom
import { useData } from "../../context/dataContext";

export default function Stats() {
  const { users, requests, onSetSelRequest } = useData();
  return (
    <div className="stats">
      <div className="stat">
        <h6>Users</h6>
        <h5>{users?.length ? users.length : 0}</h5>
        <span>+3% since last Month</span>
      </div>
      <div className="stat">
        <h6>Requests</h6>
        <h5>{requests?.length ? requests.length : 0}</h5>
        <span>+3% since last Month</span>
      </div>
      <div className="stat">
        <h6>Pending</h6>
        <h5>22</h5>
        <span>+3% since last Month</span>
      </div>
      <div className="stat">
        <h6>Collected</h6>
        <h5>220 kg</h5>
        <span>+3% since last Month</span>
      </div>
    </div>
  );
}
