import firebase from "firebase/app";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyCUymiVolkSSKfrlIg3VhNvwVRjvSw7mxk",
  authDomain: "launch-blog.firebaseapp.com",
  projectId: "launch-blog",
  storageBucket: "launch-blog.appspot.com",
  messagingSenderId: "303933014065",
  appId: "1:303933014065:web:04681334b0cf27913e9510",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
