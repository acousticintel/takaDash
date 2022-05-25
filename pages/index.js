import { useRouter } from "next/router";
//custom pack
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

//custom func
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Stats from "../components/stats";
import GraphSec from "../components/graphSec";

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

  return (
    <AuthGuard>
      <motion.div
        className="profile-page"
        variants={contVar}
        initial="hide"
        animate="show"
      >
        <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
        <Stats />
        <GraphSec />
      </motion.div>
    </AuthGuard>
  );
}
