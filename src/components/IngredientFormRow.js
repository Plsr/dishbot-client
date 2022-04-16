import { Input, HStack, Select } from "@chakra-ui/react"

export default function IngredientFormRow({ name, amount, unit, onChange, className }) {
  const UNIT_OPTIONS = ['pcs', 'g', 'ml', 'l', 'kg', 'tsp', 'tbsp', 'cup', 'oz', 'lb', 'pckgs']

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
    <HStack className={className} spacing="24px">
      <Input placeholder="Name" value={name} onChange={handleNameChange} />
      <Input placeholder="Amount" type="number" value={amount} onChange={handleAmountChange} />
      <Select placeholder="Select unit" onChange={handleUnitChange}>
        {UNIT_OPTIONS.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </Select>
    </HStack>
  )
}