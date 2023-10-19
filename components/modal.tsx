import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";
import { useEffect } from "react";

export function BasicIconModal({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        bg="teal.500"
        label={data.iconLabel}
        fontSize="md"
        placement={data.iconLabel === "Create" || "Edit" ? "left" : "right"}
      >
        <IconButton
          aria-label={data.iconLabel}
          icon={data.icon}
          variant={data.buttonVariant}
          colorScheme={data.colorScheme}
          fontSize="22px"
          onClick={() => {
            data.initFunc();
            onOpen();
          }}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>{data.body}</form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                data.funcToRun();
                onClose();
              }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
