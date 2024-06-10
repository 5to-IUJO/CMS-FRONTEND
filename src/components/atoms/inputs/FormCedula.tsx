"use client"
import { Box, FormLabel, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface FormInputProps {
    register: (placeholder: string, { }) => {},
    //errors: {Usuario: {message:string }},
    errors: any,
    errors2: any,
    obligatory?: boolean
}



/**
 * Componente para Reutilizar input de la cedula
 * @returns 
 */
export default function FormCedula({ register, errors,errors2, obligatory = false }: FormInputProps) {

    const validations = {
        required: { value: true, message: "La Cédula es requerida" },
        min: { value: 1000000, message: " La cedula tiene que tener minimo 7 números" },
        max: { value: 99999999, message: "La cedula puede tener máximo 8 números" },
        valueAsNumber: { value: true, message: "La Cédula tiene que ser un número" },
    }
    const validations2 = {
        required: { value: true, message: "El Tipo de persona es requerida " },
        value: "1"  
    }

    const [data, setData] = useState<{ id: string, name: string }[]>([]);
    useEffect(() => {
        (async () => {
            //obtener Nacionalidades de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_persons_types",)
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
    }, []);
  
    return (
        <Box w={{base:"100%",md:"250px"}}  maxW={'250px'}>
            <FormLabel fontSize={{ base: "lg", md: "xl" }} fontFamily={"NeutraText-Bold"}>Cedula de Identidad <span className='obligatory'>{obligatory ? '*' : ''}</span></FormLabel>
            <InputGroup >
                <InputLeftElement w={{base:"14%",md:"18%"}}  >
                    <Select  variant={"unstyled"}  fontSize={{ base: "lg", md: "xl" }} defaultValue={"1"}
                        {...register("type", validations2)}
                    >
                        {data.map((option, index) => {
                            return <option key={index} value={option.id.toString()} >{option.name}</option>
                        })}
                    </Select>
                </InputLeftElement>
                <Input _placeholder={{ color: 'gray.600' }} placeholder={"XXXXXXXX"} type={"number"} variant={"flushed"} pl={12}  borderColor={"#1C7987"} fontSize={{ base: "lg", md: "xl" }}
                    {...register("cedula", validations)}
                />
            </InputGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
            {errors2 && <Text color={"red"} maxW={"200px"}> {errors2.message}  </Text>}
        </Box>
    )
}
