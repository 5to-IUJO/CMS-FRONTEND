"use client"
import { Box, FormLabel, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface FormInputProps {
    Icon: React.ReactNode;
    label: string,
    table: string,
    dependency?: any | null,
    register: (placeholder: string, { }) => {},
    //errors: {Usuario: {message:string }},
    errors: any,
    namebd: string
    extraValidations?: {} | null
    setValues: any
}



/**
 * Componente para Reutilizar input tipo select 
 * @returns 
 */
export default function FormSelectNationalities({ Icon, label, table, dependency = null, register, errors, namebd, extraValidations = null, setValues }: FormInputProps) {

    const validations = {
        required: { value: true, message: label + " es requerido" },
        ...extraValidations
    }
 
    const [data, setData] = useState<{ id: string, name: string, nationality:string }[]>([]);

    useEffect(() => {
        (async () => {
            //obtener Nacionalidades de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_countries",)
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data);
                       
                    }
                })
                .catch((error) => {
                    console.log(error);

                });
          
        })();
    }, [table, dependency,namebd,setValues]);
 

    if (data.length > 0) {
        return (
            <Box w={{base:"100%",md:"250px"}}  maxW={'250px'}>
                <FormLabel fontSize={{ base: "lg", md: "xl" }}>{label}</FormLabel>
                <InputGroup >
                    <InputLeftElement pointerEvents='none' pr={5}   >
                        {Icon}
                    </InputLeftElement>
                    <Select variant={"flushed"} pl={6} fontSize={{ base: "lg", md: "xl" }} borderColor={"#1C7987"}  defaultValue={""}
                        {...register(namebd, validations)}
                    >
                        <option value="" disabled> {label} </option>
                        {data.map((option, index) => {
                            return <option key={index} value={option.id.toString()} >{option.nationality}</option>
                        })}
                    </Select>
                </InputGroup>
                {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
            </Box>
        )
    }

}
