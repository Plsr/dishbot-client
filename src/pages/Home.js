import { useContext, useEffect } from 'react'
import { validateToken } from "../util/api"
import { signOut } from "firebase/auth"
import auth from '../util/firebase'
import { Button, useToast } from '@chakra-ui/react';
import UserContext from "../util/userContext";
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { state } = useLocation();
  const toast = useToast()

  useEffect(() => {
    if (state?.displayToast) {
      const toastData = state.displayToast
      toast({
        title: toastData.title,
        description: toastData.description,
        status: toastData.status,
        duration: 3000,
        isClosable: true
      })
    }
    console.log(state)
  }, [state])

  const user = useContext(UserContext);

  const handleLogoutButtonPress = async () => {
    await signOut(auth)
    // setUser({})
    // setLoggedIn(false)
  }

  const handleValidateTokenButtonPress = async () => {
    await validateToken(user.accessToken)
  }

  return (
    <>
      <p>Hello, {user.email}</p>
      <Button onClick={handleValidateTokenButtonPress}>Validate Token</Button>
      <Button onClick={handleLogoutButtonPress}>Logout</Button>
    </>
  )
}