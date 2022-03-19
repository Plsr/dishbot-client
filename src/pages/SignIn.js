import { signInWithEmailAndPassword } from "firebase/auth"
import auth from '../util/firebase'
import { Button } from '@chakra-ui/react';

export default function SignIn() {
  // TODO: Handle 4xx errors
  const handleLoginButtonPress = async () => {
    console.log(auth)
    const authRes = await signInWithEmailAndPassword(auth, 'test3@example.com', process.env.REACT_APP_FIREBASE_DUMMY_PW)
  }

  return (
    <Button onClick={handleLoginButtonPress}>Login</Button>
  )
}