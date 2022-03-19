import { useContext } from 'react'
import { validateToken } from "../util/api"
import { signOut } from "firebase/auth"
import auth from '../util/firebase'
import { Button } from '@chakra-ui/react';
import UserContext from "../util/userContext";


// TODO: Context
export default function Home() {
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