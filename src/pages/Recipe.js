import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getRecipe as getApiRecipe } from '../util/api';
import UserContext from '../util/userContext';
import { NavLink } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { Content } from '../util/layout';

export default function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const params = useParams();

  // TODO: Move recipes to context at some point and just fetch from there
  useEffect(() => {
    async function fetchRecipe() {
      const response = await getApiRecipe(user.accessToken, params.id);
      console.log(response)
      setRecipe(response);
      setLoading(false);
    }

    fetchRecipe();
  }, [])

  return (
    <Content>
      <NavLink to='/recipes'>
        <Flex  alignItems='center'><ArrowBackIcon /> Back</Flex>
      </NavLink>
      {loading ? <div>Loading...</div> : <div>{recipe.title}</div>}
    </Content>
  )
}