import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBnDTnTUrz7c9enxvoTFm3Jr6sH0y_6hWU",
  authDomain: "novella-fe845.firebaseapp.com",
  projectId: "novella-fe845",
  storageBucket: "novella-fe845.appspot.com",
  messagingSenderId: "1049015315005",
  appId: "1:1049015315005:web:0662ef503b5e8ea8dd5854",
  measurementId: "G-M59MWQ314M",
};
export const firestoreApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firestoreApp);

connectFirestoreEmulator(firestoreDB, "localhost", 8081);
connectAuthEmulator(getAuth(), "http://localhost:9099");

enableIndexedDbPersistence(firestoreDB).catch((err) => {
  if (err.code == "failed-precondition") {
    console.error("Cannot enable offline mode");
  } else if (err.code == "unimplemented") {
    console.error("Browser does not support offline mode");
  }
});
