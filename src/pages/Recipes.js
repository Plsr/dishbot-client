import { SimpleGrid, useToast, Flex, Button } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState, useContext, useEffect } from 'react'

import RecipeForm from '../components/RecipeForm';
import { postRecipe, getRecipes as getApiRecipes, deleteRecipe, patchRecipe } from '../util/api';
import UserContext from '../util/userContext';
import { Content } from '../util/layout';
import HeaderWithButton from '../components/HeaderWithButton';
import PrimaryButton from '../components/PrimaryButton';
import ClickableRecipe from '../components/ClickableRecipe';
import RecipeModal from '../components/RecipeModal';
import RecipeModalContent from '../components/RecipeModalContent';
import RecipeModalRegularFooter from '../components/RecipeModalRegularFooter';

export default function Recipes() {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(undefined)
  const [editMode, setEditMode] = useState(false)
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

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
  }

  const handleModalCloseClick = () => {
    setSelectedRecipe(undefined);
    setEditMode(false);
  }

  const handleDeleteRecipe = async() => {
    try {
      await deleteRecipe(user.accessToken, selectedRecipe);
      const newRecipes = recipes.filter(recipe => recipe._id !== selectedRecipe);
      setSelectedRecipe(undefined);
      setRecipes([...newRecipes]);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleEditFormSubmit = async(data) => {
    try {
      const recipe = await patchRecipe(user.accessToken, data);
      const updateRecipeIndex = recipes.findIndex(recipe => recipe._id === data._id); 
      const updatedRecipes = [...recipes];
      updatedRecipes[updateRecipeIndex] = recipe;
      setRecipes([...updatedRecipes]);
      setSelectedRecipe(undefined);
      setEditMode(false)
      toast({
        title: 'Success',
        description: 'Recipe has successfully been added',
        status: 'success'
      });
    } catch(error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      });
    }
  }

  const handleFormSubmit = async (data) => {
    try {
      const recipe = await postRecipe(user.accessToken, data)
      setRecipes([...recipes, recipe])
      setShowRecipeForm(false);
      toast({
        title: 'Success',
        description: 'Recipe has successfully been added',
        status: 'success'
      });
    } catch(error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
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
          <ClickableRecipe onClick={handleRecipeClick} key={recipe._id} recipe={recipe} />
        )}
      </SimpleGrid>
      <RecipeModal
        isOpen={selectedRecipe}
        onClose={handleModalCloseClick}
        onDeleteRecipe={handleDeleteRecipe}
        onEditClick={handleEditClick}
      >
        <>
          <RecipeModalContent
            isEditMode={editMode}
            recipe={selectedRecipe && recipes.find(recipe => recipe._id === selectedRecipe)} 
            onEditSave={data => handleEditFormSubmit({...data, _id: selectedRecipe })}
            onEditAbort={() => setEditMode(false)}
          />
          <RecipeModalRegularFooter onEditClick={handleEditClick} onDeleteRecipe={handleDeleteRecipe} />
        </>
      </RecipeModal>
    </Content>
  )
}

const Form = styled(RecipeForm)`
  margin-bottom: 2rem;
`

