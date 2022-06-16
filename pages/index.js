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
  const { company } = router.query;
  const { data: session } = useSession();

  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});

  const [eventData, setEventData] = useState({});
  const [total, setTotal] = useState(0);

  function sumObjectsByKey(...objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }

  useEffect(() => {
    let c = {};
    console.log("company", company);
    const q = query(
      collection(db, "wasteProfiles"),
      where("name", "==", company ? company : "pernod"),
      limit(1)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        c = { ...doc.data(), id: doc.id };
      });

      setCompanyData(c);
    });
  }, [company]);

  useEffect(() => {
    let u = {};
    if (session?.user?.uid) {
      const docRef = doc(db, "users", session?.user?.uid);
      getDoc(docRef).then((doc) => {
        u = { ...doc.data(), id: doc.id };
        setUserData(u);
      });
    }
  }, [session]);

  useEffect(() => {
    console.log("companyData", companyData);
    if (companyData?.id) {
      const q = query(
        collection(db, "wasteProfiles", companyData.id, "events"),
        where("name", "!=", "")
      );

      getDocs(q).then((querySnapshot) => {
        let e = [];
        querySnapshot.forEach((doc) => {
          companyData = { ...doc.data(), id: doc.id };
        });

        setEventData(e);
      });
    }
  }, [companyData]);

  useEffect(() => {
    console.log("eventData", eventData);
  }, [eventData]);

  useEffect(() => {
    if (eventData?.length > 0) {
      let t = sumObjectsByKey(...eventData);
      delete t.section;
      console.log("t", t);
      setTotal(t);
    }
  }, [eventData]);

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
          userData?.company?.name === "pernod") && (
          <Recent company={companyData} />
        )}
        <Stats />
        <Categories />
        <section className="dash__linegraph">
          <LineG />
        </section>
      </motion.div>
    </AuthGuard>
  );
}
