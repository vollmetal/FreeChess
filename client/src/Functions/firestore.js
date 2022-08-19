import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile} from "firebase/auth"; 
import { getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";
import { SERVER_PATH } from "../constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5Z7PLqXZebLZdPiylAI2slu9zGnbIN3g",
    authDomain: "free-chess-7bcb9.firebaseapp.com",
    projectId: "free-chess-7bcb9",
    storageBucket: "free-chess-7bcb9.appspot.com",
    messagingSenderId: "739820690906",
    appId: "1:739820690906:web:b825a7c075a3b9f270f4e3",
    measurementId: "G-6BS943EP7Z"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    
    const docs = await getDocs(q);
    const result = await fetch(`${SERVER_PATH}/user/getuser/${user.uid}`)
        const userData = await result.json()
        if(userData.success && userData.data) {
          console.log(userData.data)
        } else {
            const result = await fetch(`${SERVER_PATH}/user/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name: user.displayName, userId: user.uid})
            })
        }
    console.log(docs.docs.length)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, {
        displayName: name
      })
      
      const result = await fetch(`${SERVER_PATH}/user/getuser/${user.uid}`)
        const userData = await result.json()
        if(userData.success && userData.data) {
        } else {
            const result = await fetch(`${SERVER_PATH}/user/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name: name, userId: user.uid})
            })
        }
      
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  export {auth, db, app, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout}