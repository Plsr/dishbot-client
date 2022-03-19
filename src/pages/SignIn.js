import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from '../util/firebase'
import { Button, Input, useToast, Box, Center, Heading } from '@chakra-ui/react';

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
      <Box
        mt={20}
        p={6} 
        maxW='lg' 
        borderWidth='1px' 
        borderRadius='lg' 
        overflow='hidden' 
        boxShadow='lg'
      >
        <Center>
          <Heading mb={6}>Sign in</Heading>
        </Center>
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
      </Box>
    </Center>
  )
}