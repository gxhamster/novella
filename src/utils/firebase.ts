import { initializeApp } from "@firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBnDTnTUrz7c9enxvoTFm3Jr6sH0y_6hWU",
  authDomain: "novella-fe845.firebaseapp.com",
  projectId: "novella-fe845",
  storageBucket: "novella-fe845.appspot.com",
  messagingSenderId: "1049015315005",
  appId: "1:1049015315005:web:0662ef503b5e8ea8dd5854",
  measurementId: "G-M59MWQ314M",
};

// Intialize the Firebase app
export const app = initializeApp(firebaseConfig);
