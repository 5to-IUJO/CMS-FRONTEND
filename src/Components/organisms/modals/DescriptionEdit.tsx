
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { Tiptap } from '../TipTap'


/**
 * Modal para Editar la Descripcion de los Usuarios
 */
export default function DescriptionEdit({ isOpen, onClose, content, onChange }: { isOpen: boolean, onClose: () => void, content: TrustedHTML | string, onChange:Function }) {
    console.log(content);
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader textAlign={"center"}>Editar Descripción</ModalHeader>
                    <ModalCloseButton />

                        <ModalBody>
                            <Tiptap onChange={onChange} content={content}/>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} variant='ghost' onClick={onClose}  >Cerrar</Button>
     

                        </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}
