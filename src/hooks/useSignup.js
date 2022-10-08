import { auth, storage, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

      if (!res) {
        throw new Error("Could not complete signup");
      }

      const avatarImagesRef = ref(
        storage,
        `avatars/${res.user.uid}/${photo.name}`
      );

      uploadBytes(avatarImagesRef, photo).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          updateProfile(auth.currentUser, {
            displayName,
            photoURL: url,
          })
            .then(() => {
              console.log("profile updated");
            })
            .catch((err) => {
              console.log(err.message);
            });
          await setDoc(doc(db, "users", res.user.uid), {
            online: true,
            displayName,
            photoURL: url,
          });
        });
      });

      dispatch({ type: "LOGIN", payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };

  return { signup, isPending, error };
};
