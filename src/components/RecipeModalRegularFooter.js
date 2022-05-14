import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Flex, ModalFooter } from '@chakra-ui/react';
import OutsideClickHandler from 'react-outside-click-handler'
import { useState } from 'react';

export default function RecipeModalRegularFooter({ onEditClick, onDeleteClick}) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const closePopover = () => setPopoverOpen(false)

  const togglePopover = () => setPopoverOpen(!popoverOpen)

  const handleDeleteClick = () => {
    setPopoverOpen(false)
    onDeleteClick()
  }

  const handleEditClick = () => {
    setPopoverOpen(false)
    onEditClick()    
  }

  return (
    <ModalFooter>
      <Button variant='outline' mr="4" onClick={handleEditClick}>Edit</Button>
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
  )
}
