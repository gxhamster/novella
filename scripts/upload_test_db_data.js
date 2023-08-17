const firestore = require("firebase/firestore");
const firebase = require("firebase/app");
const book_data = require("../src/utils/data/test_book_data.js");
const student_data = require("../src/utils/data/test_student_data.js");
const dues = require("../src/utils/data/test_due_data.js");
// These functions are only for testing purposes for firebase emulator

const firebaseConfig = {
  apiKey: "AIzaSyBnDTnTUrz7c9enxvoTFm3Jr6sH0y_6hWU",
  authDomain: "novella-fe845.firebaseapp.com",
  projectId: "novella-fe845",
  storageBucket: "novella-fe845.appspot.com",
  messagingSenderId: "1049015315005",
  appId: "1:1049015315005:web:0662ef503b5e8ea8dd5854",
  measurementId: "G-M59MWQ314M",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore();
firestore.connectFirestoreEmulator(db, "localhost", 8081);

async function uploadStudentData(db) {
  const batch = firestore.writeBatch(db);
  student_data.map((value) => {
    const n = {};
    for (const [k, v] of Object.entries(value)) {
      n[k] = v.trim();
    }
    const studentRef = firestore.doc(db, "students", n.index);
    batch.set(studentRef, n);
  });
  await batch.commit();
}

async function uploadBookData(db) {
  const batch = firestore.writeBatch(db);
  book_data.map((value) => {
    const bookRef = firestore.doc(db, "books", value.bnumber);
    batch.set(bookRef, value);
  });
  await batch.commit();
}

async function uploadDueData(db) {
  const batch = firestore.writeBatch(db);
  dues.map((value, index) => {
    const dueRef = firestore.doc(db, "dues", index.toString());
    const daysInMil = value.days * 24 * 60 * 60 * 1000;
    const offset = new Date() - daysInMil;
    const date = new Date(offset);
    value.issuedDate = date;
    const due = (value.issuedDate = batch.set(dueRef, value));
  });
  await batch.commit();
}

uploadBookData(db);
uploadStudentData(db);
// uploadDueData(db);

console.log("-- done --");
