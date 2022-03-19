import { useEffect, useState } from 'react';
import { validateToken } from './util/api';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import auth from './util/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function App() {
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

  const handleValidateTokenButtonPress = async () => {
    await validateToken(user.accessToken)
  }

  return (
    <ChakraProvider>
      <div className="App">
        { loggedIn && (
          <>
            <p>Hello, {user.email}</p>
            <Button onClick={handleValidateTokenButtonPress}>Validate Token</Button>
            <Button onClick={handleLogoutButtonPress}>Logout</Button>
          </>
        )}
        { !loggedIn && (
          <>
            <Button onClick={handleLoginButtonPress}>Login</Button>
          </>
        )}
      </div>
    </ChakraProvider>

  );
}

export default App;
