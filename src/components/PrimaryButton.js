import { Button } from '@chakra-ui/react'

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button
      color="#434a46"
      backgroundColor='#c5d4cb'
      {...props}
    >
      { children } 
    </Button>
  )
}