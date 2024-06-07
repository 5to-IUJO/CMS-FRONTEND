import { Button, useColorModeValue } from '@chakra-ui/react'
import { Save } from 'lucide-react'
import React from 'react'
/**
 * Boton de Guardar Cambios
 */
export default function SaveChangesButton({disabled, isLoading = false}:{disabled:boolean, isLoading?:boolean}) {
    return (
        <Button
            isLoading={isLoading}
            variant={'solid'}
            bgColor={useColorModeValue("black.300","white.500")}
            _hover={{bg:"cyan.400",color:"white.500"}}
            colorScheme={'blue'}
            size={'sm'}
            pl={[5, 3]}
            w={"auto"}
            isDisabled={disabled}
            rounded={"4px"}
            type={'submit'}
            leftIcon={<Save />}
            className='buttonNeon2'
            >
            Guardar Cambios

        </Button>
    )
}
