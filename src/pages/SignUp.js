import { useState } from "react"
import auth, { messageForFirebaseErrorCode } from "../util/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Input, Button, Center, Text, Container, useToast } from "@chakra-ui/react"
import BoxWithTitle from "../components/BoxWithTitle"

export default function SignUp() {
  const toast = useToast()
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('')
  const [emailFormatInvalid, setEmailFormatInvalid] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleEmailChange = (event) => setEmailValue(event.target.value)
  const handlePasswordConfirmationChange = (event) => setPasswordConfirmationValue(event.target.value)
  const handlEmailFocus = () => setEmailFormatInvalid(false)
  const handlPasswordConfirmationFocus = () => setPasswordsMatch(true)
  const checkPasswordsMatch = (
    password = passwordValue,
    confirmation = passwordConfirmationValue,
    ignoreEmpty = true
  ) => {
    if (ignoreEmpty && (!password || !confirmation)) return true
    return password === confirmation
  }



  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPasswordValue(value)
    setPasswordsMatch(checkPasswordsMatch(value))
  }
  

  const loginPossible = () => {
    if (!emailValue || !passwordValue || !passwordConfirmationValue) return false
    if (!checkPasswordsMatch(undefined, undefined, false)) return false
    if (!validEmailFormat()) return false
    return true
  }

  const handleEmailBlur = () => {
    if (!emailValue) return
    if (!checkPasswordsMatch()) setPasswordsMatch(false)
  }


  const handlePasswordConfirmationBlur = () => {
    if (!passwordConfirmationValue) return
    if (!checkPasswordsMatch()) setPasswordsMatch(false)
  }

  const validEmailFormat = () =>  /^\S+@\S+\.\S+$/.test(emailValue)

  // TODO: Display meaningful feedback in success case
  const handleSignupButtonPress = async () => {
    if (!loginPossible()) return 

    try {
      const res = await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      console.log(res)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: messageForFirebaseErrorCode(error.code),
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      console.error(error)
    }
  }
  return (
    <Center>
      <BoxWithTitle title="Register">
        <Input 
          mb={emailFormatInvalid ? 2 : 4}
          value={emailValue}
          placeholder="email"
          onChange={handleEmailChange} 
          onBlur={handleEmailBlur}
          onFocus={handlEmailFocus}
          isInvalid={emailFormatInvalid}
        />
        { emailFormatInvalid && (
          <Text mb={4} fontSize="xs" color="tomato">Please check the format of the email you entered.</Text>
        )}

        <Input
          mb={4}
          value={passwordValue}
          placeholder="password"
          type="password"
          onChange={handlePasswordChange}
        />
        <Input
          mb={passwordsMatch ? 4 : 2}
          value={passwordConfirmationValue}
          placeholder="Confirm password"
          type="password"
          onChange={handlePasswordConfirmationChange}
          onBlur={handlePasswordConfirmationBlur}
          onFocus={handlPasswordConfirmationFocus}
        />
        { !passwordsMatch && (
          <Text mb={4} fontSize="xs" color="tomato">Password and password confrimation do not match</Text>
        )}
        <Button 
          colorScheme="purple"
          onClick={handleSignupButtonPress}
          isDisabled={!loginPossible()}
        >
          Register
        </Button>
      </BoxWithTitle>
    </Center>
  )
}