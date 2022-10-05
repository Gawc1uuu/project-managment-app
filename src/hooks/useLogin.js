import { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { setDoc, doc } from "firebase/firestore";

export const useLogin = () => {
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState();
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(false);
    try {
      setIsPending(true);

      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, { online: true }, { merge: true });
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };
  return { login, isPending, error };
};
