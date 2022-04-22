import { useState, useEffect, useContext } from 'react'

import { Button } from '@chakra-ui/react'
import { Content } from '../util/layout'
import { getRecipes as getApiRecipes } from '../util/api'
import userContext from '../util/userContext'
import MealPlanForm from '../components/MealPlanForm'

export default function MealPlans() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [mealPlan, setMealPlan] = useState({})
  const [recipes, setRecipes] = useState({})

  const user = useContext(userContext)


  useEffect(() => {
    const getCurrentMealPlan = async() => {
      // TODO: Get current meal plan
      // TODO: Set current meal plan
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

  return (
    <Content>
      { mealPlanPresent() && (
        <p>there is a current meal plan</p>
      )}
      { !mealPlanPresent() && (
        <p>there is no current meal plan</p>
      )}
      { recipes.length > 0 && (
        <Button colorScheme="purple" onClick={handleNewButtonClick}>Create new meal plan</Button>
      )}
      { showNewForm && (
        <>
          <MealPlanForm recipes={recipes} />
          <Button onClick={handleCloseButtonClick}>Close</Button>
        </>
      )}
    </Content>
  )
}
