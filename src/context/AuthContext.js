import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, auth_is_ready: true, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    auth_is_ready: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "AUTH_IS_READY", payload: user });
      } else {
        dispatch({ type: "AUTH_IS_READY", payload: null });
      }
    });
    unsub();
  }, []);
  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
