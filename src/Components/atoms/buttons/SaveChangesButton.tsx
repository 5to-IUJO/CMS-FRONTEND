import { Button } from '@chakra-ui/react'
import { Save } from 'lucide-react'
import React from 'react'
/**
 * Boton de Guardar Cambios
 */
export default function SaveChangesButton({disabled}:{disabled:boolean}) {
    return (
        <Button
            variant={'solid'}
            bg={"#171B27"}
            colorScheme={'blue'}
            size={'sm'}
            pl={[5, 3]}
            w={"auto"}
            isDisabled={disabled}
            rounded={"4px"}
            type={'submit'}
            leftIcon={<Save />}>
            Guardar Cambios

        </Button>
    )
}
