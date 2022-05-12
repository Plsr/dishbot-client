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

export default function RecipeModal({ isOpen, onClose, children, onDeleteRecipe }) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const togglePopover = () => setPopoverOpen(!popoverOpen)

  const closePopover = () => setPopoverOpen(false)

  const handleDeleteClick = () => onDeleteRecipe()

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
        <ModalBody>
          { children }
        </ModalBody>
        <ModalFooter>
          <Button display="none" variant='outline' mr="4">Edit</Button>
          <Popover isOpen={popoverOpen} >
            <OutsideClickHandler onOutsideClick={() => setPopoverOpen(false)}>
            <PopoverTrigger>
              <Button colorScheme='red' mr={3} onClick={togglePopover}>
                Delete
              </Button>
              </PopoverTrigger>        
              <PopoverContent py={4}>
                <PopoverArrow />
                <PopoverHeader>Are you sure?</PopoverHeader>
                <PopoverBody>You will not be able to restore this recipe and it will be removed from all meal plans</PopoverBody>
                <Flex justify="flex-end">
                  <Button variant='outline' mr="4" onClick={closePopover}>No</Button>
                  <Button colorScheme='red' mr={3} onClick={handleDeleteClick}>
                    Yes, Delete
                  </Button>
                </Flex>
              </PopoverContent>
            </OutsideClickHandler>
          </Popover>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
