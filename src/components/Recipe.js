import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import IngredientsList from './IngredientsList';

export default function Recipe({ recipe }) {
  const { title, createdAt, icon, ingredients } = recipe;
  return(
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="4">
      <Heading size='md' mb="1.5">{ icon } { title }</Heading>
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
      <IngredientsList ingredients={ingredients} maxIngredients={3} />
    </Box>
  )
}
