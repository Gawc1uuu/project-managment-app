import { useReducer } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
        document: null,
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
    default:
      return { ...state };
  }
};

export const useFirestore = (col) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);

  const addDocument = async (data) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(collection(db, col), data);
      dispatch({ type: "ADDED_DOCUMENT", document: addedDocument });
      console.log("ADDED!");
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  };

  const updateDocument = async (id, update) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await updateDoc(doc(db, col, id), update);
      dispatch({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
      console.log("added");
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
      console.log(err.message);
    }
  };

  return { addDocument, deleteDocument, updateDocument, state };
};
