import { Button, Heading, SimpleGrid, useToast } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState, useContext, useEffect } from 'react'

import RecipeForm from '../components/RecipeForm';
import { postRecipe, getRecipes as getApiRecipes } from '../util/api';
import UserContext from '../util/userContext';
import { Content } from '../util/layout';
import HeaderWithButton from '../components/HeaderWithButton';
import PrimaryButton from '../components/PrimaryButton';
import ClickableRecipe from '../components/ClickableRecipe';

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
      <HeaderWithButton
        title="Your Recipes"
        showButton={!showRecipeForm}
        button={
          <PrimaryButton onClick={handleAddButtonClick} leftIcon={<SmallAddIcon />}>Add Recipe</PrimaryButton>
        }
      />
      { showRecipeForm && (
        <Form
          onClose={() => setShowRecipeForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      <SimpleGrid columns={3} spacing={10} >
        {recipes.map(recipe =>
          <ClickableRecipe key={recipe._id} id={recipe._id} name={recipe.title} icon={recipe.icon} ingredients={recipe.ingredients} createdAt={recipe.createdAt} />
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
