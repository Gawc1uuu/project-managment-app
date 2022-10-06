import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (name) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, name);
    const unsub = onSnapshot(
      ref,
      (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("could not fetch the data");
      }
    );

    return () => unsub();
  }, [name]);

  return { documents, error };
};
