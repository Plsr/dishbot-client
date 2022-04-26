import styled from "@emotion/styled"
import { Heading } from "@chakra-ui/react"

export default function HeaderWithButton({ title, button, showButton}) {
  return (
    <HeaderWrapper>
      <Heading size="lg">{ title }</Heading>
      { showButton && (
        <>
          { button }
        </>
      )}
  </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`