"use client"
import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormInput from '../atoms/FormInput'
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '../atoms/FormRadioInput';
import FormCheckInput from '../atoms/FormCheckInput';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';


const GendersOptions: { value: string, label: string }[] = [
    { value: "1", label: "Masculino" },
    { value: "2", label: "Feminino" },
    { value: "3", label: "Otro" },
]

export default function FormRegisterUser() {
 
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const router = useRouter();
    //Funcion para enviar los datos a la api y efectuar el registro
    const onSubmit = handleSubmit(data => {
        
        axios.post(process.env.NEXT_PUBLIC_API_URL+"register",data)
        .then(async (response)=>{
            console.log(response);
            if(response.status === 201)
            {
                await saveToken(response.data.token);
                router.push("/dashboard");

            }
        }).catch((error)=>{
            console.log(error);
            if('username' in error.response.data )
                setError("username",{message:"Ya Existe un Usuario con Este Nombre"})

        })  
    });


    return (
        <>
            <Text
                textAlign={'center'}
                fontSize={{ base: "3xl", md: "xl" }}
                fontWeight={"bold"}
            >
                Registro
            </Text>

            <form className={"mt-10"}  onSubmit={onSubmit}>
                <Flex
                    flexDirection={'column'}
                    flexWrap={"wrap"}
                    wrap={"wrap"}
                    gap={{ base: 10, md: 10 }}
                >
                    <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username'  />
                    <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password'  />
                    <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email'  />
                    <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth'  />
                    <FormRadioInput label='Genero' data={GendersOptions} register={register} errors={errors.gender} namebd='gender' />
                    <FormCheckInput label='Acepto los Terminos y Condiciones' register={register} errors={errors.terms} namebd='terms' />

                    <Button rightIcon={<FaArrowRight />} colorScheme='blue' variant="solid" type='submit'>
                        Registrarse
                    </Button>

                    <Text textAlign={'center'}>
                        ¿Ya tienes una Cuenta?
                        <Link href={"/login"} className=' text-blue-500' > Iniciar Sesión</Link>
                    </Text>
                </Flex>
            </form>

        </>

    )
}
