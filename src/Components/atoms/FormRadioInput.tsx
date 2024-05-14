import { FormLabel, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface FormRadioInputProps{
    label: string;
    data: {value: string, label: string}[],
    register: (placeholder:string, {})=>{},
    errors: any,
    namebd: string
}

/**
 * Componente para Reutilizar input generico de tipo Radio Button
 * @returns 
 */
export default function FormRadioInput({label, data, register, errors, namebd}: FormRadioInputProps) {
    const validations = {
        required: {value:true, message: label+" es requerido"}, 
    }

    return (
        <section>
            <FormLabel fontSize={{base:"xl",md:"xl"}}>{label}</FormLabel>
            <RadioGroup  >
                <Stack direction='row'>
                    {data.map((option, index )=>{
                        return <Radio key={index} value={option.value} {...register(namebd, validations)} >{option.label}</Radio>
                    })}
                </Stack>
            </RadioGroup>
            {errors && <Text color={"red"}> {errors.message}  </Text>}
        </section>
    )
}
