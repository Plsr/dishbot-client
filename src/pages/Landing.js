import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <>
      <p>Landing</p>
      <Button><Link to="/signin">Signin</Link></Button>      
      <Button><Link to="/signup">Signup</Link></Button>      
    </>
  )
}