import Image from "next/image";
import { useRouter } from "next/router";
//custom pack
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
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
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
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

  const [userData, setUserData] = useState(
    userDataInit ? JSON.parse(userDataInit) : {}
  );
  const [companyData, setCompanyData] = useState(
    companyDataInit ? JSON.parse(companyDataInit) : {}
  );

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
      where(
        "name",
        "==",
        company ? company : userData?.company ? userData.company : "demo"
      ),
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
    if (session?.user?.id) {
      const docRef = doc(db, "users", session?.user?.id);
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
    //console.log("eventData", userData);
    //console.log("companyData", companyData);
  }, [companyData, userData]);

  useEffect(() => {
    if (eventsData?.length > 0) {
      let t = sumObjectsByKey(...eventsData);
      setTotal(t);
    }
  }, [eventsData]);

  const companyName = (company) => {
    if (company === "pernod") {
      return "Pernod Ricard";
    }
    return "Demo";
  };

  return (
    <motion.div
      className="dash__page"
      variants={contVar}
      initial="hide"
      animate="show"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {companyData?.image && (
              <Image src={companyData.image} layout="fill" />
            )}
          </div>
        </div>
        <h1 className="text-2xl font-semibold my-2">
          {companyName(companyData.name)} Waste Profile
        </h1>
      </div>

      {userData?.role === "admin" || userData?.company?.name === "pernod" ? (
        <Recent events={eventsData} company={companyData} />
      ) : (
        <div className="dash__page__no-access">
          <h6 className="text-xl text-center text-gray-500 my-20">
            To avoid showing sensitive information. <br />
            You must sign in to view events data
          </h6>
        </div>
      )}
      <Stats total={total?.total} non={total?.non} />
      <Categories />
      <section className="dash__linegraph">
        <LineG events={eventsData} />
      </section>
    </motion.div>
  );
}
export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const q = query(
      collection(db, "users"),
      where("email", "==", session?.user?.email),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let tmpUser = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tmpUser = { ...doc.data(), id: doc.id };
    });

    const q1 = query(
      collection(db, "wasteProfiles"),
      where("name", "==", tmpUser?.company),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    let tmpCompany = {};
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tmpCompany = { ...doc.data(), id: doc.id };
    });

    return {
      props: {
        userDataInit: JSON.stringify(tmpUser),
        companyDataInit: JSON.stringify(tmpCompany),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
