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

const authContext = createContext();

export function ProvideAuth({ children }) {
  const data = useProvideAuth();
  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const { data: session, status } = useSession();
  //hold app states
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);


  return { user };
}
