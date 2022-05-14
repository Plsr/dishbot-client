import { useState } from "react";
import { Button, Input, Flex, Spacer } from "@chakra-ui/react"
import IngredientFormRow from "./IngredientFormRow";
import styled from "@emotion/styled";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import OutsideClickHandler from 'react-outside-click-handler'
import PrimaryButton from "./PrimaryButton";

// Array of emojis related to food
const RECOMMENDED_EMOJIS = ["🥑", "🍅", "🥕", "🍔", "🍟", "🍕", "🍗", "🍝", "🍜", "🍲", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🍪", "🍫", "🍬", "🍭", "🍮", "🍯", "🍤", "🍗", "🍔", "🍟", "🍕", "🍗", "🍝", "🍜", "🍲", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🍪", "🍫", "🍬", "🍭", "🍮", "🍯", "🍤", "🍗", "🍔", "🍟", "🍕", "🍗", "🍝", "🍜", "🍲", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🍪", "🍫", "🍬", "🍭", "🍮", "🍯", "🍤", "🍗", "🍔", "🍟", "🍕", "🍗", "🍝", "🍜", "🍲", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨"]

export default function RecipeForm({ onClose, onSubmit, className, initialTitle, InitialIngredients, initialDescription, initialIcon }) {
  const empytIngredientRow = { name: '', amount: '', unit: '' };

  const [ingredients, setIngredients] = useState(InitialIngredients ? [...InitialIngredients] : [{...empytIngredientRow}]);
  const [title, setTitle] = useState(initialTitle || '');
  const [icon, setIcon] = useState(initialIcon || RECOMMENDED_EMOJIS[Math.floor(Math.random() * RECOMMENDED_EMOJIS.length)])
  const [description, setDescription] = useState(initialDescription || "");
  const [showPicker, setShowPicker] = useState(false)

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
      icon,
      description,
      ingredients: cleanedIngredients
    }
  }

  const formSubmittable = (formData) => {
    if (!formData.title || !formData.icon || !formData.ingredients || formData.ingredients.length < 1) return false;

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
      if (data.name && data.amount && data.unit) {
        setIngredients([...newIngredients, {...empytIngredientRow}]);
        return
      }
    }
    setIngredients(newIngredients);
  }

  const handleEmojiButtonClick = () => {
    setShowPicker(!showPicker)
  }

  const handlePickerOutsideClick = () => {
    setShowPicker(false)
  }

  const handleEmojiClick = emoji => {
    setIcon(emoji.native)
    setShowPicker(false)
  }

  return (
    <div className={className}>
        <EmojiWrapper>
          <OutsideClickHandler onOutsideClick={handlePickerOutsideClick}>
            <EmojiButton onClick={handleEmojiButtonClick}>{ icon }</EmojiButton>
            {showPicker && (
              <Picker
                set="apple"
                onSelect={handleEmojiClick}
                showPreview={false}
                showSkinTones={false}
                style={{ position: 'absolute', zIndex: 2, top: '100%', left: 0 }}
              />
            )}
        </OutsideClickHandler>
      </EmojiWrapper>
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
        <PrimaryButton onClick={handleSubmitButtonClick} disabled={!formSubmittable(gatherFormData())}>Submit</PrimaryButton>
      </Flex>
    </div>
  )
}

const StyledIngredientFormRow = styled(IngredientFormRow)`
  margin-bottom: 1rem;
`

const EmojiWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  display: inline-block;
`

const EmojiButton = styled.div`
  background-color: #f8f8f8;
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e8e8e8;
  }
`
