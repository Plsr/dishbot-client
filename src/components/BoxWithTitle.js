import { Box, Center, Heading } from "@chakra-ui/react";

export default function BoxWithTitle({ title, children }) {
  return (
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
          <Heading mb={6}>{title}</Heading>
        </Center>
        {children}
      </Box>
  )
}