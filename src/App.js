import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Container as AppContainer, BaseStyles } from './util/layout';
import auth from './util/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserContext from './util/userContext';
import Header from './components/Header';
import theme from './util/theme'

import AppRoutes from './components/AppRoutes'

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
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={user}>
        <BaseStyles>
          <AppContainer>
            <Header loggedIn={user}/>
            <AppRoutes />
          </AppContainer>
        </BaseStyles>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
