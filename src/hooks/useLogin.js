import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

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
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };
  return { login, isPending, error };
};
