import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged(firebaseUser => {
      setLoading(true);
      if (firebaseUser) {
        setTimeout(
          () =>
            axios
              .get(`http://localhost:8000/login?id=${firebaseUser.uid}`)
              .then(res => {
                setUser(res && res.data);
                setLoading(false);
              }),
          1000
        );
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p>Loading</p>;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthContext };