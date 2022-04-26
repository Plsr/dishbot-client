import { useEffect } from "react"
import { signOut } from "firebase/auth"
import auth from "../util/firebase"

export default function SignOut() {
  useEffect(() => {
    signOut(auth)
  }, [])

  return null
}