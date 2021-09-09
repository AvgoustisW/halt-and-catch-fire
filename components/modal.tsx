import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton
  } from "@chakra-ui/react"

import { useDisclosure } from "@chakra-ui/hooks"
import { useEffect } from 'react';

export function BasicIconModal({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>        
        <IconButton 
                    aria-label={data.iconLabel} 
                    icon={data.icon}
                    variant={data.buttonVariant}
                    fontSize="22px"
                    onClick={() => { data.initFunc(); onOpen()}}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                {data.body}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => {data.funcToRun(); onClose()}}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }