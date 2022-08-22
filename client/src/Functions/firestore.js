import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile} from "firebase/auth"; 
import { getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";
import { SERVER_PATH, SERVER_PORT } from "../constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_F_API_KEY,
    authDomain: process.env.REACT_APP_F_A_DOMAIN,
    projectId: process.env.REACT_APP_F_PROJECT_ID,
    storageBucket: process.env.REACT_APP_F_S_BUCKET,
    messagingSenderId: process.env.REACT_APP_F_SENDER_ID,
    appId: process.env.REACT_APP_F_APP_ID,
    measurementId: process.env.REACT_APP_F_M_ID
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
        } else {
            const result = await fetch(`${SERVER_PATH}/user/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name: user.displayName, userId: user.uid})
            })
        }
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