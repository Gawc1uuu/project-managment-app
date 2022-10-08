import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from "firebase/firestore";

export const useLogout = () => {
  const { dispatch, user } = useAuthContext();
  const logout = async () => {
    const { uid } = user;
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { online: false }, { merge: true });
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
