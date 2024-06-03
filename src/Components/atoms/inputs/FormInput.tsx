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
}



/**
 * Componente para Reutilizar input generico en el Login & Register
 * @returns 
 */
<<<<<<< HEAD:src/Components/atoms/FormInput.tsx
export default function FormInput({ Icon, label, placeholder, type, register, errors, namebd, extraValidations = null }: FormInputProps) {

    const validations = {
        required: { value: true, message: label + " es requerido" },
        minLength: { value: 5, message: label + " tiene que tener minimo 5 caracteres" },
        maxLength: { value: 40, message: label + " puede tener máximo 40 caracteres" },
=======
export default function FormInput({ Icon, label, placeholder, type, register, errors, namebd, extraValidations=null, disable=false }: FormInputProps) {
    
    const validations = {
        required: {value:true, message: label+" es requerido"}, 
        minLength: {value:3, message: label+" tiene que tener minimo 3 caracteres"}, 
        maxLength: {value:40, message: label+" puede tener máximo 40 caracteres"},
>>>>>>> ad82ee18fc6dd0bf2f2e59acef01c65375d5990e:src/Components/atoms/inputs/FormInput.tsx
        ...extraValidations
    }
    return (
        <Box w={{base:"100%",md:"auto"}}>
            <FormLabel fontSize={{ base: "lg", md: "xl" }} fontFamily={"NeutraText-Bold"}>{label}</FormLabel>
            <InputGroup >
                <InputLeftElement pointerEvents='none' pr={5}   >
                    {Icon}
                </InputLeftElement>
<<<<<<< HEAD:src/Components/atoms/FormInput.tsx
                <Input
                    placeholder={placeholder}
                    type={type} variant={"flushed"}
                    pl={6} color={"gray.600"}
                    fontSize={{ base: "lg", md: "xl" }}
                    {...register(namebd, validations)}
                    _focusVisible={{ borderBottom: "2px solid #1F93A5" }}
=======
                <Input placeholder={placeholder} type={type} variant={"flushed"} pl={6}  borderColor={"#1C7987"} fontSize={{ base: "lg", md: "xl" }} 
                disabled={disable}
                {...register(namebd, validations)}
>>>>>>> ad82ee18fc6dd0bf2f2e59acef01c65375d5990e:src/Components/atoms/inputs/FormInput.tsx
                />
            </InputGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
        </Box>
    )
}
