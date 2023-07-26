import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA9p42oYNDg_7oS4qKSaSLHSv0ePH9iK0Y",
  authDomain: "curso-15c79.firebaseapp.com",
  projectId: "curso-15c79",
  storageBucket: "curso-15c79.appspot.com",
  messagingSenderId: "924214676481",
  appId: "1:924214676481:web:f96bed0584f9dd273d8400",
  measurementId: "G-L60MSDPP6C"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };