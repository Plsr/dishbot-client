import { Button, Heading } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState } from 'react'

import RecipeForm from '../components/RecipeForm';

export default function Recipes() {
  const [showRecipeForm, setShowRecipeForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowRecipeForm(true);
  }

  const handleFormSubmit = (data) => {
    console.log("Submitted form with data: ", data)
  }

  return (
    <>
      <HeaderWrapper>
        <Heading size="lg">Your Recipes</Heading>
        <Button onClick={handleAddButtonClick} colorScheme='teal' leftIcon={<SmallAddIcon />}>Add Recipe</Button>
      </HeaderWrapper>
      { showRecipeForm && (
        <RecipeForm
          onClose={() => setShowRecipeForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
