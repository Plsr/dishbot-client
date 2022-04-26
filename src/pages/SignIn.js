import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from '../util/firebase'
import { Button, Input, useToast, Center } from '@chakra-ui/react';
import BoxWithTitle from "../components/BoxWithTitle";

export default function SignIn() {
  const toast = useToast()
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleEmailChange = (event) => setEmailValue(event.target.value)
  
  const handlePasswordChange = (event) => setPasswordValue(event.target.value)

  const handleLoginButtonPress = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: "Please make sure you entered the correct email and password",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      console.error(error)
    }
  }

  return (
    <Center>
      <BoxWithTitle title="Sign in">
        <Input 
          mb={4}
          value={emailValue}
          placeholder="email"
          onChange={handleEmailChange} 
        />
        <Input
          mb={4}
          value={passwordValue}
          placeholder="password"
          type="password"
          onChange={handlePasswordChange}
        />
        <Button 
          colorScheme="purple"
          onClick={handleLoginButtonPress}
          isDisabled={!(emailValue && passwordValue)}
        >
          Login
        </Button>
      </BoxWithTitle>
    </Center>
  )
}