import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  query,
  where,
  addDoc, 
  setDoc,
  getDoc,
  getDocs,
  collection,
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
  const [userData, setUserData] = useState(null);

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

  async function updateWasteProfile(companyid, eventId, section, waste) {
    return new Promise(async (resolve, reject) => {
      try {
        const eventSecRef = collection(db, "wasteProfiles", companyid, "events", eventId, "sections");

        const q = query(eventSecRef, where("section", "==", section));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            //merge data into section
            const docRef = doc(db, "wasteProfiles", companyid, "events", eventId, "sections", docSnap.id);

            setDoc(docRef, waste, { merge: true })
              .then(() => {
                resolve("success");
              })
              .catch((error) => {
                reject(error);
              });
          });
        } else {
          //add new section to database
          const docRef = collection(db, "wasteProfiles", companyid  , "events", eventId, "sections");

          addDoc(docRef, {
            section,
            ...waste,
          })
            .then(() => {
              resolve("success");
            })
            .catch((error) => {
              reject(error);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return { userData, updateWasteProfile, side, onSetSide };
}
