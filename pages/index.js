import { useRouter } from "next/router";
//custom pack
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
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
  onSnapshot,
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

  const [eventsData, setEventsData] = useState({});
  const [total, setTotal] = useState(0);

  function sumObjectsByKey(...objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }

  const getCompanyData = async (company) => {
    const q = query(
      collection(db, "wasteProfiles"),
      where("name", "==", company ? company : "pernod"),
      limit(1)
    );

    getDocs(q).then((querySnapshot) => {
      let c = {};
      querySnapshot.forEach((doc) => {
        c = { ...doc.data(), id: doc.id };
      });

      setCompanyData(c);
    });
  };

  const getEventData = async (companyData) => {
    if (companyData?.id) {
      //firebase listener for user data
      const q = query(
        collection(db, "wasteProfiles", companyData.id, "events"),
        where("name", "!=", null)
      );
      return onSnapshot(q, (querySnapshot) => {
        const e = [];
        querySnapshot.forEach((doc) => {
          e.push({ ...doc.data(), id: doc.id });
        });
        setEventsData(e);
      });
    }
  };

  useEffect(() => {
    //console.log("company", company);
    getCompanyData(company);
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
    //console.log("company", companyData);
    getEventData(companyData);
  }, [companyData]);

  useEffect(() => {
    //console.log("eventData", eventsData);
  }, [eventsData]);

  useEffect(() => {
    if (eventsData?.length > 0) {
      let t = sumObjectsByKey(...eventsData);
      setTotal(t);
    }
  }, [eventsData]);

  return (
    <motion.div
      className="dash__page"
      variants={contVar}
      initial="hide"
      animate="show"
    >
      <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
      {(userData?.role === "admin" || userData?.company?.name === "pernod") && (
        <Recent events={eventsData} company={companyData} />
      )}
      <Stats total={total?.total} non={total?.non} />
      <Categories />
      <section className="dash__linegraph">
        <LineG events={eventsData} />
      </section>
    </motion.div>
  );
}
