import { useRouter } from "next/router";
//custom pack
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
//custom func
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Stats from "../components/stats/totalStats";
import LineG from "../components/graphSec/lineG";
import Categories from "../components/categories";
import Recent from "../components/events/recent";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

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

export default function Profile({ userDataInit, companyDataInit }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [userData, setUserData] = useState(
    userDataInit ? JSON.parse(userDataInit) : {}
  );
  const [companyData, setCompanyData] = useState(
    companyDataInit ? JSON.parse(companyDataInit) : {}
  );

  return (
    <AuthGuard>
      <motion.div
        className="dash__page"
        variants={contVar}
        initial="hide"
        animate="show"
      >
        <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
        {(userData?.role === "admin" ||
          userData?.company?.name === "pernod") && <Recent company={companyData}/>}
        <Stats />
        <Categories />
        <section className="dash__linegraph">
          <LineG />
        </section>
      </motion.div>
    </AuthGuard>
  );
}
