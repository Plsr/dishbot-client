import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import IngredientsList from './IngredientsList';
import styled from '@emotion/styled';

export default function Recipe({ name, icon, ingredients, createdAt }) {
  return(
    <Wrapper borderWidth='1px' borderRadius='lg' overflow='hidden' p="4">
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
      <IngredientsList ingredients={ingredients} maxIngredients={3} />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`
