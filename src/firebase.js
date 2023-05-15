import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDelYy0-9U6NfXSpNFrv7FtG7wM_kFL384",
  authDomain: "chatonit-app.firebaseapp.com",
  projectId: "chatonit-app",
  storageBucket: "chatonit-app.appspot.com",
  messagingSenderId: "550090751874",
  appId: "1:550090751874:web:66dff0314df319cacf599b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
