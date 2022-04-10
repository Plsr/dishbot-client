import { Input, HStack } from "@chakra-ui/react"

export default function IngredientFormRow({ name, amount, unit, onChange }) {

  const handleNameChange = (e) => {
    onChange({
      name: e.target.value,
      amount,
      unit
    });
  }

  const handleAmountChange = (e) => {
    onChange({
      name,
      amount: e.target.value,
      unit
    });
  }

  const handleUnitChange = (e) => {
    onChange({
      name,
      amount,
      unit: e.target.value
    });
  }

  return (
    <HStack spacing="24px">
      <Input placeholder="Name" value={name} onChange={handleNameChange} />
      <Input placeholder="Amount" value={amount} onChange={handleAmountChange} />
      <Input placeholder="Unit" value={unit} onChange={handleUnitChange} />
    </HStack>
  )
}