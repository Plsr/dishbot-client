import { useState } from "react";
import { Button, Input } from "@chakra-ui/react"
import IngredientFormRow from "./IngredientFormRow";

export default function RecipeForm({ onClose, onSubmit }) {
  const empytIngredientRow = { name: undefined, amount: undefined, unit: undefined };

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
    <>
      <Input placeholder="Title" value={title} onChange={handleTitleChange}/>
      <Input placeholder="Description" value={description} onChange={handleDescriptionChange} />
      { ingredients.map((ingredient, index) => <IngredientFormRow key={index} {...ingredient} onChange={(data) => handleIngredientRowChange(index, data)} />)}
      <Button onClick={handleCloseButtonClick}>Close</Button>
      <Button onClick={handleSubmitButtonClick} disabled={!formSubmittable(gatherFormData())}>Submit</Button>
    </>
  )
}
