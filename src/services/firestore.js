import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyAjZO9ksTI5lbCJU7-N_60NRKCqRWOVgzM",
  authDomain: "marconapoleone-site.firebaseapp.com",
  projectId: "marconapoleone-site",
  appId: "1:442587088494:web:7108dcc087c0efe402c87f",
  databaseURL: "",
};


const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const db = firebase.firestore();
export const firebaseAuth = firebaseApp.auth();
export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};