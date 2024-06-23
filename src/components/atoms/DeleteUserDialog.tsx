import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

/**
 * Componente con el Dialog/Modal de confirmación para eliminar un Usuario
 */
export default function DeleteUserDialog({isOpen,onClose,cancelRef,onClick}: {isOpen:boolean,onClose:()=> void,cancelRef: any,onClick: ()=>void}) {

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Eliminar Usuario
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas Seguro que Desea Eliminar al Usuario? <br /> Esta acción es irreversible.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='red' onClick={()=>{onClick();onClose();}} ml={3}>
                            Eliminar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
