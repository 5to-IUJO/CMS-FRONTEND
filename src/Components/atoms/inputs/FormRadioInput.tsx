"use client"
import { FormLabel, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface FormRadioInputProps {
    label: string;
    table: string,
    register: (placeholder: string, { }) => {},
    errors: any,
    namebd: string,
    defaultValue: string,
}

/**
 * Componente para Reutilizar input generico de tipo Radio Button
 * @returns 
 */
export default function FormRadioInput({ label, table, register, errors, namebd, defaultValue }: FormRadioInputProps) {
    const validations = {
        required: { value: true, message: label + " es requerido" },
    }

    const [data, setData] = useState<{ id: string, name: string }[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

    useEffect(() => {
        (async () => {
            //obtener genders de la base de datos
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_" + table,)
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

    // Actualizar el valor seleccionado cuando `defaultValue` cambie
    useEffect(() => {

        setSelectedValue(defaultValue);
    }, [defaultValue]);

    if (!defaultValue)
        return

    return (
        <section>
            <FormLabel fontSize={{ base: "lg", md: "xl" }} fontFamily={"NeutraText-Bold"}>{label}</FormLabel>
            <RadioGroup value={selectedValue} onChange={setSelectedValue}   >
                <Stack direction='row'>
                    {data.map((option, index) => {
                        return <Radio key={index} value={option.id.toString()} {...register(namebd, validations)}
                            _checked={{
                                bg: "#1C7987",
                                borderColor: "#1C7987",
                                color: "white", // Color del texto cuando está seleccionado
                            }}
                            _focus={{
                                boxShadow: "0 0 0 1px #1C7987",
                            }}
                            _before={{
                                content: '""',
                                display: "inline-block",
                                width: "17px",
                                height: "17px",
                                position: "absolute",
                                top: 1,
                                left: 0,
                                borderRadius: "50%",
                                border: "2px solid #1C7987",
                            }}>{option.name}</Radio>
                    })}
                </Stack>
            </RadioGroup>
            {errors && <Text color={"red"} maxW={"200px"}> {errors.message}  </Text>}
        </section>
    )
}
