import { Button, Heading } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState, useContext, useEffect } from 'react'

import RecipeForm from '../components/RecipeForm';
import { postRecipe, getRecipes as getApiRecipes } from '../util/api';
import UserContext from '../util/userContext';
import { Content } from '../util/layout';

export default function Recipes() {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([])
  const user = useContext(UserContext);

  useEffect(() => {
    const getRecipes = async() => {
      const fetchedRecipes = await getApiRecipes(user.accessToken);
      setRecipes([...fetchedRecipes]);
    }

    getRecipes()
  }, [])

  const handleAddButtonClick = () => {
    setShowRecipeForm(true);
  }

  // TODO: Error handling
  const handleFormSubmit = async (data) => {
    const recipe = await postRecipe(user.accessToken, data)
    setRecipes([...recipes, recipe])
    setShowRecipeForm(false);
    console.log("Submitted form with data: ", data)
  }

  return (
    <Content>
      <HeaderWrapper>
        <Heading size="lg">Your Recipes</Heading>
        { !showRecipeForm && (
          <Button onClick={handleAddButtonClick} colorScheme='teal' leftIcon={<SmallAddIcon />}>Add Recipe</Button>
        )}
      </HeaderWrapper>
      { showRecipeForm && (
        <Form
          onClose={() => setShowRecipeForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {recipes.map(recipe =>
        <p>{ recipe.title }</p>
      )}
    </Content>
  )
}

const Form = styled(RecipeForm)`
  margin-bottom: 2rem;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`
