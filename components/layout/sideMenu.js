import { useData } from "../../context/dataContext";
import SidebarItem from "../elements/sidebarItem";
import { motion, AnimatePresence } from "framer-motion";
import { routes } from "../../context/vars";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const dropVar = {
  hide: {
    opacity: 0,
    height: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.25,
    },
  },
  show: {
    opacity: 1,
    height: "100%",
    transition: {
      ease: "easeInOut",
      duration: 0.25,
    },
  },
};

export default function SideMenu() {
  const { side } = useData();
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    //firebase listener for user data
    if (session?.user?.id) {
      const docRef = doc(db, "users", session?.user?.id);
      getDoc(docRef).then((doc) => {
        setUserData(doc.data());
      });
    }
  }, [db, session]);

  useEffect(() => {
    //console.log("userData", userData);
  }, [userData]);


  return (
    <AnimatePresence exitBeforeEnter>
      {side && (
        <motion.div
          exit="hide"
          animate="show"
          initial="hide"
          variants={dropVar}
          className="fixed top-0 left-0 flex flex-col flex-1 inset-0 z-40 
          bg-emerald-900 text-lime-50 max-h-screen overflow-hidden pt-20"
        >
          {routes?.length > 0 &&
            routes.map((r, i) => {
              if (r.protect && userData?.role !== "admin") return null;
              return <SidebarItem route={r} key={i} />;
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
