import { Box, Heading } from '@chakra-ui/react';

export default function Recipe({ name, ingredients, createdAt }) {
  return(
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="3">
      <Box
        color='gray.500'
        fontWeight='semibold'
        letterSpacing='wide'
        fontSize='xs'
        textTransform='uppercase'
      >
        {createdAt}
      </Box>
      <Heading size='sm'>{ name }</Heading>
      {ingredients.map((ingredient, index) =>
        <Box key={index}>{ ingredient.name }</Box>
      )}
    </Box>
  )
}