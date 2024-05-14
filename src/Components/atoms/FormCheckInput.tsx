import { Checkbox, Text} from '@chakra-ui/react'
import React from 'react'

interface FormCheckInputProps{
    label: string;
    register: (placeholder:string, {})=>{},
    errors: any,
    namebd: string
}

/**
 * Componente para Reutilizar un input checkbox 
 * @returns 
 */
export default function FormCheckInput( {label,register,errors,namebd}:FormCheckInputProps) {

    const validations = {
        required: {value:true, message:" Es Obligatorio "}, 
    }

    return (
        <section>
            <Checkbox fontSize={{base:"xl",md:"xl"}}  {...register(namebd, validations)} >{label}</Checkbox>
            {errors && <Text color={"red"}> {errors.message}  </Text>}
        </section>
    )
}
