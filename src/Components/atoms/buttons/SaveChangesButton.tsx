import { Button } from '@chakra-ui/react'
import { Save } from 'lucide-react'
import React from 'react'

export default function SaveChangesButton() {
    return (
        <Button
            variant={'solid'}
            bg={"#171B27"}
            colorScheme={'blue'}
            size={'sm'}
            pl={[5, 3]}
            w={"auto"}

            rounded={"4px"}

            leftIcon={<Save />}>
            Guardar Cambios

        </Button>
    )
}
