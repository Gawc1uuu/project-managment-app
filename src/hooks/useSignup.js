import { async } from "@firebase/util";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState();
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, photo) => {
    setError(null);
    setIsPending(false);
    try {
      setIsPending(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName,
      });
      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };
  return { signup, isPending, error };
};
