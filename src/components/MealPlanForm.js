import { useState, useContext } from 'react'
import { postMealPlan } from '../util/api'
import userContext from '../util/userContext'
import Recipe from './Recipe'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  SimpleGrid
} from '@chakra-ui/react'

export default function MealPlanForm({ recipes, newMealPlanCreated }) {
  const [selectedRecipes, setSelecteRecipes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('New meal plan')
  const user = useContext(userContext)

  const handleAddNewClick = () => {
    setShowModal(true)
  }

  const handleModalCloseClick = () => {
    setShowModal(false)
  }

  const handleRecipeClick = (recipe) => {
    console.log(recipe)
    console.log('Clicked recipe: ', recipe.title)
    setSelecteRecipes([...selectedRecipes, recipe])
    setShowModal(false)
  }

  const handleSaveFormClick = async() => {
    console.log('Attempting to create new meal plan')
    console.log(selectedRecipes)
    const recipeIds = selectedRecipes.map(recipe => recipe._id)
    const mealPlanData = {
      title,
      recipes: [...recipeIds]
    }

    const mealPlan = await postMealPlan(user.accessToken, mealPlanData)
    console.log(mealPlan)
    newMealPlanCreated(mealPlan)
  }

  return(
    <div>
      <Input value={title} onChange={event =>setTitle(event.target.value)} />
      <SimpleGrid columns={3} spacing={4} mt="4" mb="4" >
        { selectedRecipes.map(recipe => (
          <Recipe
            key={recipe._id}
            name={recipe.title}
            icon={recipe.icon}
            ingredients={recipe.ingredients}
            createdAt={recipe.createdAt}
          />
        ))}
      </SimpleGrid>
      <Button mb="4" onClick={handleAddNewClick}>
        add new recipe
      </Button>
      <br />
      <Button colorScheme="whatsapp" onClick={handleSaveFormClick}>Save</Button>
      <Modal isOpen={showModal} onClose={handleModalCloseClick} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { recipes.map(recipe => (
              <Box
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p="3"
                mb="6"
                onClick={() => handleRecipeClick(recipe)}
              >
                {recipe.title}
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
