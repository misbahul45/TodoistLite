// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCtiWlRRmXH65zc_h9JrV7cIv-nVHg3lWw",
  authDomain: "todolist-project-7979d.firebaseapp.com",
  databaseURL: "https://todolist-project-7979d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-project-7979d",
  storageBucket: "todolist-project-7979d.appspot.com",
  messagingSenderId: "839491810794",
  appId: "1:839491810794:web:64d2cf5b6bf4295aa76e93",
  measurementId: "G-T72FE2SQ0G"
};
const app = initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(app)
export const gogleProvider=new GoogleAuthProvider()
export const db=getFirestore(app)

