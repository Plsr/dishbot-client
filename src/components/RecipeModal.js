import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

export default function RecipeModal({ isOpen, onClose, children, onDeleteRecipe, onEditClick }) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const togglePopover = () => setPopoverOpen(!popoverOpen)

  const closePopover = () => setPopoverOpen(false)

  const handleDeleteClick = () => {
    setPopoverOpen(false)
    onDeleteRecipe()
  }

  const handleEditClick = () => {
    onEditClick()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={closePopover}
      onEsc={closePopover}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mb="4"></ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        { children }
      </ModalContent>
    </Modal>
  )
}
