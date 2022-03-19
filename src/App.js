import { useEffect, useState } from 'react';
import { validateToken } from './util/api';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import auth from './util/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import { useNavigate } from "react-router-dom";
import UserContext from './util/userContext';
import RequireAuth from './components/RequireAuth';
import Landing from './pages/Landing';


function App() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user is authenticated')
          setUser(user)
          navigate('/home')
        } else {
          console.log('user is not authenticated')
          setUser(null)
        }
    });
    return () => unsubscribe();
}, []);

  return (
    <ChakraProvider>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </ChakraProvider>

  );
}

export default App;
