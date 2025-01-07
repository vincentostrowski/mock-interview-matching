import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBw6xe1GCDkvN862t6JBR2LLKOcVpmHdlI",
  authDomain: "mock-519d0.firebaseapp.com",
  projectId: "mock-519d0",
  storageBucket: "mock-519d0.firebasestorage.app",
  messagingSenderId: "706375307879",
  appId: "1:706375307879:web:a63bf4fc0f1c037aa3bac2",
  measurementId: "G-ERDPGX08XD",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
