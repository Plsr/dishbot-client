import { Button, Heading, SimpleGrid, useToast } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState, useContext, useEffect } from 'react'

import RecipeForm from '../components/RecipeForm';
import Recipe from '../components/Recipe';
import { postRecipe, getRecipes as getApiRecipes } from '../util/api';
import UserContext from '../util/userContext';
import { Content } from '../util/layout';

export default function Recipes() {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([])
  const user = useContext(UserContext);
  const toast = useToast();

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

  const handleFormSubmit = async (data) => {
    try {
      const recipe = await postRecipe(user.accessToken, data)
      setRecipes([...recipes, recipe])
      setShowRecipeForm(false);
      toast({
        title: 'Success',
        description: 'Recipe has successfully been added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch(error) { 
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
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
      <SimpleGrid columns={3} spacing={10} >
        {recipes.map(recipe =>
          <Recipe name={recipe.title} ingredients={recipe.ingredients} createdAt={recipe.createdAt} />
        )}
      </SimpleGrid>
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
