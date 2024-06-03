import { Button, Tooltip } from '@chakra-ui/react'
import { ListRestart } from 'lucide-react'
import React from 'react'

export default function RestarFormButton({restar}:{restar:Function}) {
    return (
        <Tooltip label='Reinicia el Formulario a antes de los cambios' hasArrow  >
            <Button

                variant={'solid'}
                bg={"transparent"}
                colorScheme={'none'}
                color={"#584D4B"}
                onClick={() => restar()}
                _hover={{
                    color: "#1C7987"
                }}
                size={'sm'}
                pl={[5, 3]}
                w={"auto"}
                m={2}
                rounded={"4px"}

                leftIcon={<ListRestart />}>
                Resetear
            </Button>
        </Tooltip>
    )
}
