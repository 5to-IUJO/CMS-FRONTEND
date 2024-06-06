import { Box, Input } from '@chakra-ui/react';
import React from 'react';



interface ColorPickerButtonProps {
    onInput: Function,
    value: string
}


/**
 * Componente de un input tipo color
 */
const ColorPickerButton = ({onInput,value}: ColorPickerButtonProps) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            boxShadow="sm"
        >
            <Input
                type="color"
                w="10"
                h="10"
                p="0"
                m="0"
                border="none"
                cursor="pointer"
                onInput={event => onInput(event)}
                value={value}
               
                css={{
                    '::-webkit-color-swatch-wrapper': {
                        padding: 0,
                    },
                    '::-webkit-color-swatch': {
                        border: 'none',
                    },
                }}
            />
        </Box>
    );
}

export default ColorPickerButton;
