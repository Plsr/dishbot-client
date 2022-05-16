import { ModalBody } from "@chakra-ui/react"
import RecipeForm from "./RecipeForm"
import Recipe from "./Recipe"

export default function RecipeModalContent({ recipe, isEditMode, onEditSave, onEditAbort }) {
  if (!recipe) return null

  if (isEditMode) return (
    <ModalBody>
      <RecipeForm 
        onClose={onEditAbort}
        onSubmit={onEditSave}
        initialTitle={recipe.title} 
        initialDescription={recipe.desciption} 
        initialIcon={recipe.icon} 
        InitialIngredients={[...recipe.ingredients]}
      />
    </ModalBody>
  )

  return (
    <ModalBody>
      <Recipe recipe={recipe} />
    </ModalBody>
  )
}
