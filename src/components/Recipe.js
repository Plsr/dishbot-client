import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import IngredientsList from './IngredientsList';

export default function Recipe({ recipe }) {
  const { title, createdAt, icon, ingredients } = recipe;
  return(
    <>
      <div>{ icon }</div>
      <Heading size='md' mb="1.5">{ title }</Heading>
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
      <IngredientsList ingredients={ingredients} maxIngredients={ingredients.length} />
    </>
  )
}
