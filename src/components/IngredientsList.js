import { Box } from '@chakra-ui/react';

export default function IngredientsList({ ingredients, maxIngredients }) {
  const displayIngredients = ingredients.slice(0, maxIngredients)
  const remainingIngredients = ingredients.length - maxIngredients
  return (
    <>
      {displayIngredients.map((ingredient, index) => (
        <>
          <Box
            key={index}
            fontWeight="regular"
            color="gray.700"
            mb="1"
          >
            {ingredient.name}
            <Box
              fontWeight="semibold"
              color="gray.400"
              display="inline"
              pl="1"
            >
              {ingredient.amount}{ingredient.unit}
            </Box>
          </Box>
        </>
      ))}
      { remainingIngredients > 0 && (
        <Box
          fontWeight="regular"
          color="gray.500"
          mb="1"
          fontSize="sm"
        >
          + {remainingIngredients} more
        </Box>
      )}

    </>
  );
}
