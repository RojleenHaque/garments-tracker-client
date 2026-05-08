import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";

import app from "../firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, name) => {
    setLoading(true);

    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
    });

    return result;
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
  

  return (
    <AuthContext.Provider value={{ user, loading, createUser, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};