import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (id, col) => {
  const [document, setDocument] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    const unsub = onSnapshot(
      doc(db, col, id),
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: id });
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => unsub();
  }, [col, id]);

  return { document, error };
};
