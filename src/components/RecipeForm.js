import { useState } from "react";
import { Button, Input, Flex, Spacer } from "@chakra-ui/react"
import IngredientFormRow from "./IngredientFormRow";
import styled from "@emotion/styled";

export default function RecipeForm({ onClose, onSubmit, className }) {
  const empytIngredientRow = { name: '', amount: '', unit: '' };

  const [ingredients, setIngredients] = useState([{...empytIngredientRow}]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseButtonClick = () => {
    onClose();
  }

  const handleSubmitButtonClick = () => {
    onSubmit(gatherFormData())
  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const gatherFormData = () => {
    const cleanedIngredients = ingredients.filter(ingredient => (
      ingredient.name && ingredient.amount && ingredient.unit
    ))

    return {
      title,
      description,
      ingredients: cleanedIngredients
    }
  }

  const formSubmittable = (formData) => {
    if (!formData.title || !formData.ingredients || formData.ingredients.length < 1) return false;

    formData.ingredients.forEach(ingredient => {
      if (!ingredient.name || !ingredient.amount || !ingredient.unit) {
        return false;
      }
    });

    return true;
  }

  const handleIngredientRowChange = (index, data) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = data;

    if (index === ingredients.length - 1) {
      console.log('add new row')
      console.log(data)
      if (data.name && data.amount && data.unit) {
        setIngredients([...newIngredients, {...empytIngredientRow}]);
        return
      }
    }
    setIngredients(newIngredients);
  }

  return (
    <div className={className}>
      <Input placeholder="Title" value={title} onChange={handleTitleChange} mb={4} />
      <Input placeholder="Description" value={description} onChange={handleDescriptionChange} mb={4} />
      { ingredients.map((ingredient, index) => (
        <StyledIngredientFormRow
          {...ingredient} 
          key={index} 
          onChange={(data) => handleIngredientRowChange(index, data)}
        />
      ))}
      <Flex>
        <Button onClick={handleCloseButtonClick} mr={2}>Close</Button>
        <Spacer />
        <Button colorScheme="blue" onClick={handleSubmitButtonClick} disabled={!formSubmittable(gatherFormData())}>Submit</Button>
      </Flex>
    </div>
  )
}

const StyledIngredientFormRow = styled(IngredientFormRow)`
  margin-bottom: 1rem;
`
