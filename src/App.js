import { useEffect, useState } from 'react';
import { validateToken } from './util/api';
import { ChakraProvider } from '@chakra-ui/react'
import { Container as AppContainer, BaseStyles } from './util/layout';
import auth from './util/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import { useNavigate } from "react-router-dom";
import UserContext from './util/userContext';
import RequireAuth from './components/RequireAuth';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Recipes from './pages/Recipes';
import MealPlans from './pages/MealPlans';
import SignOut from './pages/SignOut';

function App() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user is authenticated')
          setUser(user)
          navigate('/home', {
            state: {
              displayToast: {
                status: 'success',
                title: 'Great success',
                description: 'Successfully logged in'
              } 
            }
          })
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
        <BaseStyles>
          <AppContainer>
            <Header loggedIn={user}/>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
                }
              />
              <Route path="/recipes" element={
                <RequireAuth>
                  <Recipes />
                </RequireAuth>
                }
              />
              <Route path="/meal-plans" element={
                <RequireAuth>
                  <MealPlans />
                </RequireAuth>
                }
              />
              <Route path="/meal-plans" element={
                <RequireAuth>
                  <MealPlans />
                </RequireAuth>
                }
              />
              <Route path="/signout" element={
                <RequireAuth>
                  <SignOut />
                </RequireAuth>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </AppContainer>
        </BaseStyles>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
