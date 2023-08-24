import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { FC } from "react"

interface ConfirmDeleteProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => Promise <void>
    messagem: string
}

export const ConfirmDelete:  FC<ConfirmDeleteProps> = ({
    isOpen,
    onClose,
    onConfirm,
    messagem
}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>                
                <ModalHeader>              
                   Confirma a Exclusão
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>{messagem}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onConfirm}>
                        Excluir
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}