//custom
import { AuthGuard } from "../elements/authGuard";
import Title from "../elements/title";
import RequestTable from "../tables/requestTable";

export default function Requests() {
  return (
    <AuthGuard>
      <div className="request__page">
        <h1>Requests</h1>
        <section>
          <RequestTable />
        </section>
      </div>
    </AuthGuard>
  );
}
