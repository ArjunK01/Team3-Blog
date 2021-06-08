import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";
import Loading from "../components/Loading";

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
        console.log(firebaseUser.uid + " Logged in");
        setTimeout(
          () =>
            axios
              .get(`http://localhost:8000/user/get/${firebaseUser.uid}`)
              .then(res => {
                console.log(firebaseUser.uid + " User set");

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

  if (loading) return <Loading />;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthContext };
