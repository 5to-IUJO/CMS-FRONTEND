"use client"
import { FormLabel, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react'
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
    setValues: any,
    onChange: Function
}



/**
 * Componente para Reutilizar input tipo select 
 * @returns 
 */
export default function FormSelect({ Icon, label, table, dependency = null, register, errors, namebd, extraValidations = null, onChange }: FormInputProps) {

    const validations = {
        onChange: () => onChange(table),
        required: { value: true, message: label + " es requerido" },
        ...extraValidations
    }
 
    const [data, setData] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        (async () => {
          
            //obtener Nacionalidades de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_" + table + `${dependency ? "?id=" + dependency : ""}`,)
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data);
    
                    }
                })
                .catch((error) => {
                    console.log(error);

                });


        })();
    }, [table, dependency]);
 

    if (data.length > 0) {
        return (
            <section>
                <FormLabel fontSize={{ base: "lg", md: "xl" }} >{label}</FormLabel>
                <InputGroup >
                    <InputLeftElement pointerEvents='none' pr={5}   >
                        {Icon}
                    </InputLeftElement>
                    <Select variant={"flushed"} pl={6} fontSize={{ base: "lg", md: "xl" }} borderColor={"#1C7987"}  defaultValue={""}
                        {...register(namebd, validations)}
                    >
                        <option value="" disabled>Selecciona el {label} </option>
                        {data.map((option, index) => {
                            return <option key={index} value={option.id.toString()} >{option.name}</option>
                        })}
                    </Select>
                </InputGroup>
                {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
            </section>
        )
    }

}
