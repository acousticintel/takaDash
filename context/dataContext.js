import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
} from "@firebase/firestore";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const { data: session, status } = useSession();
  //hold app states
  const [side, setSide] = useState(false);

  const onSetSide = (val) => setSide(val);

  //useEffect(() => { }, []);
  useEffect(() => {
    createUser();
  }, [db, session]);

  async function createUser() {
    if (status !== "loading" && session?.user) {
      const docRef = doc(db, "users", session.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", session.user.uid), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    }
  }

  return { side, onSetSide };
}
