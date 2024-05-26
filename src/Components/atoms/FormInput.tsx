import { FormLabel, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'

interface FormInputProps {
    Icon: React.ReactNode;
    label: string,
    placeholder: string,
    type: string,
    register: (placeholder:string, {})=>{},
    //errors: {Usuario: {message:string }},
    errors: any,
    namebd: string
    extraValidations?: {} | null
}



/**
 * Componente para Reutilizar input generico en el Login & Register
 * @returns 
 */
export default function FormInput({ Icon, label, placeholder, type, register, errors, namebd, extraValidations=null }: FormInputProps) {
    
    const validations = {
        required: {value:true, message: label+" es requerido"}, 
        minLength: {value:5, message: label+" tiene que tener minimo 5 caracteres"}, 
        maxLength: {value:40, message: label+" puede tener máximo 40 caracteres"},
        ...extraValidations
    }
    return (
        <section>
            <FormLabel fontSize={{ base: "xl", md: "xl" }}>{label}</FormLabel>
            <InputGroup >
                <InputLeftElement pointerEvents='none' pr={5}   >
                    {Icon}
                </InputLeftElement>
                <Input placeholder={placeholder} type={type} variant={"flushed"} pl={6} color={"gray.600"} fontSize={{ base: "lg", md: "xl" }} 
                {...register(namebd, validations)}
                />
            </InputGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
        </section>
    )
}
