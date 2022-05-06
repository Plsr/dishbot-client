import { NavLink } from 'react-router-dom';
import Recipe from './Recipe'

export default function ClickableRecipe({ id, name, icon, ingredients, createdAt }) {
  return (
    <NavLink to={`/recipes/${id}`}>
      <Recipe name={name} icon={icon} ingredients={ingredients} createdAt={createdAt} />
    </NavLink>
  )
}