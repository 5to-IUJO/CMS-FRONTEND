import { Checkbox, Text} from '@chakra-ui/react'
import React from 'react'

interface FormCheckInputProps{
    label: string;
    register: (placeholder:string, {})=>{},
    errors: any,
    namebd: string
    forceColor?:string
}

/**
 * Componente para Reutilizar un input checkbox 
 * @returns 
 */
export default function FormCheckInput( {label,register,errors,namebd,forceColor=undefined}:FormCheckInputProps) {

    const validations = {
        required: {value:true, message:" Es Obligatorio "}, 
    }

    return (
        <section>
            <Checkbox fontSize={{base:"xl",md:"xl"}}  {...register(namebd, validations)} color={forceColor ? forceColor : ""}>{label}</Checkbox>
            {errors && <Text color={"red"}  maxW={"200px"}> {errors.message}  </Text>}
        </section>
    )
}
