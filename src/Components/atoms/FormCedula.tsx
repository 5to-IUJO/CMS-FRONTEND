"use client"
import { FormLabel, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface FormInputProps {
    register: (placeholder: string, { }) => {},
    //errors: {Usuario: {message:string }},
    errors: any,
    errors2: any,
}



/**
 * Componente para Reutilizar input de la cedula
 * @returns 
 */
export default function FormCedula({ register, errors,errors2 }: FormInputProps) {

    const validations = {
        required: { value: true, message: "La Cédula es requerida" },
        min: { value: 1000000, message: " La cedula tiene que tener minimo 7 números" },
        max: { value: 99999999, message: "La cedula puede tener máximo 8 números" },
        valueAsNumber: { value: true, message: "La Cédula tiene que ser un número" },
    }
    const validations2 = {
        required: { value: true, message: "La Nacionalidad es requerida " },
        value: "1"  
    }

    const [data, setData] = useState<{ id: string, name: string }[]>([]);
    useEffect(() => {
        (async () => {
            //obtener Nacionalidades de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_nationalities",)
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
        <section>
            <FormLabel fontSize={{ base: "xl", md: "xl" }}>Cedula de Identidad</FormLabel>
            <InputGroup >
                <InputLeftElement w={"18%"}  >
                    <Select variant={"unstyled"} color={"gray.600"} fontSize={{ base: "lg", md: "xl" }} defaultValue={"1"}
                        {...register("nationality", validations2)}
                    >
                        {data.map((option, index) => {
                            return <option key={index} value={option.id.toString()} >{option.name}</option>
                        })}
                    </Select>
                </InputLeftElement>
                <Input placeholder={"XXXXXXXX"} type={"number"} variant={"flushed"} pl={12} color={"gray.600"} fontSize={{ base: "lg", md: "xl" }}
                    {...register("cedula", validations)}
                />
            </InputGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
            {errors2 && <Text color={"red"} maxW={"200px"}> {errors2.message}  </Text>}
        </section>
    )
}
