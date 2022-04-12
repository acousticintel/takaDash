import { useRouter } from "next/router";
//custom pack
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

//custom func
import { useData } from "../context/dataContext";
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Modal from "../components/modals/requestModal";
import RecentModal from "../components/modals/recentModal";
import Stats from "../components/stats";
import GraphSec from "../components/graphSec";
import Requests from "../components/requests";

const contVar = {
  hide: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { onSetQrModal, onSetReqModal } = useData();

  const handleHistoryClick = (e) => {
    e.preventDefault();
    router.push("/rates");
  };

  return (
    <AuthGuard>
      <motion.div
        className="profile-page"
        variants={contVar}
        initial="hide"
        animate="show"
      >
        <RecentModal />
        <Modal session={session} />
        <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
        <Stats />
        <GraphSec />
        <motion.section variants={riseVar}>
          <Requests />
        </motion.section>
      </motion.div>
    </AuthGuard>
  );
}
