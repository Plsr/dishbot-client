import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

const MAX_INGREDIENTS = 3;

export default function Recipe({ name, icon, ingredients, createdAt }) {
  const displayIngredients = ingredients.slice(0, MAX_INGREDIENTS)
  console.log(displayIngredients)
  const remainingIngredients = ingredients.length - MAX_INGREDIENTS
  console.log(remainingIngredients)
  return(
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="4">
      <Heading size='md' mb="1.5">{ icon } { name }</Heading>
      <Box
        color='gray.500'
        fontWeight='semibold'
        letterSpacing='wide'
        fontSize='xs'
        textTransform='uppercase'
        mb='6'
      >
        Added {format(new Date(createdAt), 'MMM dd, yyyy')}
      </Box>
      {displayIngredients.map((ingredient, index) =>
        <>
          <Box
            key={index}
            fontWeight='regular'
            color='gray.700'
            mb="1"
          >
            { ingredient.name }
          <Box
            key={index}
            fontWeight='semibold'
            color='gray.400'
            display="inline"
            pl="1"
          >
            {ingredient.amount}{ingredient.unit}
          </Box>
          </Box>
        </>
      )}
      { remainingIngredients > 0 && (
        <Box
          fontWeight='regular'
          color='gray.500'
          mb="1"
          fontSize="sm"
        >
          + { ingredients.length - 3 } more
        </Box>
      )}
    </Box>
  )
}
