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

export default function RecipeModal({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mb="4"></ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody>
          { children }
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' mr="4">Edit</Button>
          <Popover>
            <PopoverTrigger>
            <Button colorScheme='red' mr={3}>
              Delete
            </Button>
            </PopoverTrigger>
            <PopoverContent py={4}>
              <PopoverArrow />
              <PopoverHeader>Are you sure?</PopoverHeader>
              <PopoverBody>You will not be able to restore this recipe and it will be removed from all meal plans</PopoverBody>
              <Flex justify="flex-end">
                <Button variant='outline' mr="4">No</Button>
                <Button colorScheme='red' mr={3}>
                  Yes, Delete
                </Button>
              </Flex>
            </PopoverContent>
          </Popover>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
