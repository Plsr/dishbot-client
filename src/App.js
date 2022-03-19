import logo from './logo.svg';
import './App.css'
import { useEffect, useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};



function App() {
    // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // detaching the listener
        if (user) {
            // ...your code to handle authenticated users. 
            console.log('user is authenticated')
            console.log(user)
            setUser(user)
            setLoggedIn(true)
        } else {
            console.log('user is not authenticated')
            // No user is signed in...code to handle unauthenticated users. 
        }
    });
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting. 
}, []);

  // TODO: Handle 4xx errors
  const handleLoginButtonPress = async () => {
    console.log(auth)
    const authRes = await signInWithEmailAndPassword(auth, 'test3@example.com', process.env.REACT_APP_FIREBASE_DUMMY_PW)
    const token = authRes.user.accessToken
  }

  const handleLogoutButtonPress = async () => {
    await signOut(auth)
    setUser({})
    setLoggedIn(false)
  }

  return (
    <div className="App">
      { loggedIn && (
        <>
          <p>Hello, {user.email}</p>
          <button onClick={handleLogoutButtonPress}>Logout</button>
        </>
      )}
      { !loggedIn && <button onClick={handleLoginButtonPress}>Login</button>}
    </div>
  );
}

export default App;
