import { Box, FormLabel, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'

interface FormInputProps {
    Icon: React.ReactNode;
    label: string,
    placeholder: string,
    type: string,
    register: (placeholder: string, { }) => {},
    //errors: {Usuario: {message:string }},
    errors: any,
    namebd: string
    extraValidations?: {} | null,
    disable?:boolean
    forceColor?: string
    obligatory?: boolean
}


/**
 * Componente para Reutilizar input generico en el Login & Register
 * @returns 
 */
export default function FormInput({ Icon, label, placeholder, type, register, errors, namebd, extraValidations = null, disable = false, forceColor = undefined, obligatory = false }: FormInputProps) {

    const validations = {
        required: { value: true, message: label + " es requerido" },
        
        maxLength: { value: 40, message: label + " puede tener máximo 40 caracteres" },
        ...extraValidations
    }
    return (
        <Box w={{base:"100%",md:"250px"}} maxW={'250px'} color={forceColor ? forceColor : ""}>
            <FormLabel fontSize={{ base: "lg", md: "xl" }} fontFamily={"NeutraText-Bold"}>{label} <span className='obligatory'>{obligatory ? '*' : ''}</span></FormLabel>
            <InputGroup >
                <InputLeftElement pointerEvents='none' pr={5}   >
                    {Icon}
                </InputLeftElement>
                <Input
                    placeholder={placeholder}
                    type={type} variant={"flushed"}
                    pl={6} 
                   
                    _placeholder={{ color: 'gray.500' }}
                    fontSize={{ base: "lg", md: "xl" }}
                    borderColor={"#1F93A5"}
                    {...register(namebd, validations)}
                    disabled={disable}
                    _focusVisible={{ borderBottom: "2px solid #1F93A5" }}
                />
            </InputGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
        </Box>
    )
}
