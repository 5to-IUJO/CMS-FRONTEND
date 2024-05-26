"use client"
import { FormLabel, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface FormRadioInputProps{
    label: string;
    table: string,
    register: (placeholder:string, {})=>{},
    errors: any,
    namebd: string,
    defaultValue: string,
}

/**
 * Componente para Reutilizar input generico de tipo Radio Button
 * @returns 
 */
export default function FormRadioInput({label, table, register, errors, namebd,defaultValue}: FormRadioInputProps) {
    const validations = {
        required: {value:true, message: label+" es requerido"}, 
    }

    const [data, setData] = useState<{ id: string, name: string }[]>([]);
    useEffect(() => {
        (async () => {
            //obtener genders de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_"+table,)
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener los Generos");
                });
        })();
    }, [table]);

    return (
        <section>
            <FormLabel fontSize={{base:"xl",md:"xl"}}>{label}</FormLabel>
            <RadioGroup defaultValue={defaultValue}  >
                <Stack direction='row'>
                    {data.map((option, index )=>{
                        return <Radio key={index} value={option.id.toString()} {...register(namebd, validations)} >{option.name}</Radio>
                    })}
                </Stack>
            </RadioGroup>
            {errors && <Text color={"red"}  maxW={"200px"}> {errors.message}  </Text>}
        </section>
    )
}
