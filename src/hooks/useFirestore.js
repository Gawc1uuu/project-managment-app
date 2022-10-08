import { useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
  }
};

export const useFirestore = (col) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);

  const ref = collection(db, col);
  const addDocument = async (d) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(ref, d);
      dispatch({ type: "ADDED_DOCUMENT", document: addedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));
    } catch (err) {}
  };
};
