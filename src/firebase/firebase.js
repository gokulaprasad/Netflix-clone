import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbIBDQyeQP4DI7WIKdxzOZKUI7_jCIYfE",
  authDomain: "netflix-clone-e2cc1.firebaseapp.com",
  projectId: "netflix-clone-e2cc1",
  storageBucket: "netflix-clone-e2cc1.firebasestorage.app",
  messagingSenderId: "847226713119",
  appId: "1:847226713119:web:9e56177f2af1103041912a",
  measurementId: "G-Y7Z0VNYFVM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export default app;