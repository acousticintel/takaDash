import Image from "next/image";
import dayjs from "dayjs";
import { motion } from "framer-motion";
//custom
import { useData } from "../context/dataContext";
import { AuthGuard } from "../components/elements/authGuard";
import Title from "../components/elements/title";
import Status from "../components/elements/status";
import RecentModal from "../components/modals/recentModal";
import PieG from "../components/graphSec/pieG";

const childVar = {
  hide: {
    y: 5,
    scale: 0.95,
    opacity: 0,
  },
  show: (i) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function History() {
  const { onSetRecModal, requests, onSetSelRequest } = useData();

  const handleClick = (r) => {
    console.log(r);
    onSetSelRequest(r);
    onSetRecModal(true);
  };

  const getDate = (date) => {
    let d = date.toDate();
    return dayjs(d).format("DD MMM YYYY");
  };

  return (
    <AuthGuard>
      <RecentModal />
      <div className="history-page">
        <h1>Request Stats</h1>
        <div className="hist__graphs">
          <PieG
            values={[50, 45]}
            labels={["Pick Up Requests", "Drop off Requests"]}
          />
          <PieG
            values={[75, 20, 5]}
            labels={["Confirmed", "Pending", "Cancelled"]}
          />
        </div>
        <h1>Request History</h1>
        <section className="hist__table">
          <table>
            <thead>
              <tr>
                <th scope="col">Items</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests?.length > 0 &&
                requests.map((r, i) => (
                  <motion.tr
                    variants={childVar}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={i}
                    key={i}
                    onClick={() => handleClick(r)}
                  >
                    <td className="flex justify-start items-center">
                      <div className="relative h-8 w-8 mr-4 rounded-md overflow-hidden">
                        <Image
                          src={r.profileImg}
                          className="object-contain"
                          layout="fill"
                        />
                      </div>
                      {`${r.username}`}
                    </td>
                    <td className="">{r.type}</td>
                    <td className="pending">{getDate(r.timestamp)}</td>
                    <td>
                      <Status status={r.status} />
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </AuthGuard>
  );
}
