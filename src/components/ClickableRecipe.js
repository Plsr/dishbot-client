import Recipe from './Recipe'
import styled from '@emotion/styled';

export default function ClickableRecipe({ onClick, recipe }) {
  const handleClick = () => {
    onClick(recipe._id);
  }

  return (
    <Wrapper role="button" onClick={handleClick}>
      <Recipe recipe={recipe} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`
