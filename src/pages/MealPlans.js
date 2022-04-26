import { useState, useEffect, useContext } from 'react'

import { Button, Heading, Box } from '@chakra-ui/react'
import { Content } from '../util/layout'
import { getRecipes as getApiRecipes, getCurrentMealPlan as getApiCurrentMealPlan } from '../util/api'
import userContext from '../util/userContext'
import MealPlanForm from '../components/MealPlanForm'
import HeaderWithButton from '../components/HeaderWithButton'

export default function MealPlans() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [mealPlan, setMealPlan] = useState({})
  const [recipes, setRecipes] = useState({})

  const user = useContext(userContext)


  useEffect(() => {
    const getCurrentMealPlan = async() => {
      const res = await getApiCurrentMealPlan(user.accessToken)
      console.log(res)
      if (res) setMealPlan(res)
      console.log('Got and set current meal plan')
    }

    const getRecipes = async() => {
      const recipes = await getApiRecipes(user.accessToken)
      setRecipes(recipes)
    }

    getCurrentMealPlan()
    getRecipes()
  }, [])

  const handleNewButtonClick = () => {
    console.log('clicked create new')
    setShowNewForm(true)
  }

  const handleCloseButtonClick = () => {
    setShowNewForm(false)
  }

  const mealPlanPresent = () => {
    return Object.keys(mealPlan).length > 0
  }

  const handleNewMealPlanCreated = (newMealPlan) => {
    if (!mealPlan) return
    setMealPlan(newMealPlan)
    setShowNewForm(false)
  }

  return (
    <Content>
      { showNewForm && (
        <Box borderWidth="1px" borderRadius="lg" p="4" mb="8">
          <MealPlanForm recipes={recipes} newMealPlanCreated={handleNewMealPlanCreated} />
          <Button onClick={handleCloseButtonClick}>Close</Button>
        </Box>
      )}
      { mealPlanPresent() && (
        <>
          <HeaderWithButton
            title="Current meal plan"
            showButton={!showNewForm}
            button={
              <Button colorScheme="purple" onClick={handleNewButtonClick}>Create new meal plan</Button>
            }
          />
          <Box borderWidth='1px' borderRadius='lg' p="4" mb="8">
            <Heading size="md" mb="2">{ mealPlan.title }</Heading>
            <Heading size="xs" mb="1">{mealPlan.recipes.length} Recipes</Heading>
            { mealPlan.recipes.map(recipe => (
              <Box
                key={recipe.id}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p="3"
                mb="6"
              >
                <p>{recipe.title}</p>
                <p>{recipe.ingredients.length} Ingredients</p>
              </Box>
            ))}
          </Box>
          <Box>
            <Heading size="md" mb="2">Shopping List</Heading>
            { mealPlan.shoppingList.items.map(item => (
              <p>{item.name} {item.amount} {item.unit}</p>
            ))}
          </Box>
        </>
      )}
      { !mealPlanPresent() && (
        <p>there is no current meal plan</p>
      )}
    </Content>
  )
}
