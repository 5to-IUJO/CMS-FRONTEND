"use client"
import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import FormInput from '../atoms/FormInput'
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';
import GoogleButton from '../atoms/GoogleButton';

export default function FormLogin() {

    const { handleSubmit,setError ,register, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = handleSubmit(data => {
        
        axios.post(process.env.NEXT_PUBLIC_API_URL+"login",data)
        .then(async (response)=>{
            if(response.status === 200)
            {
                await saveToken(response.data.token);
                router.push("/dashboard");
            }
        }).catch((error)=>{
                setError("password",{message:"Datos Invalidos, Intente Nuevamente"})
        })
    });

    return (
        <>
            <Text
                textAlign={'center'}
                fontSize={{ base: "3xl", md: "xl" }}
                fontWeight={"bold"}
            >
                Iniciar Sesión
            </Text>

            <form className={"mt-10"} onSubmit={onSubmit}>
                <Flex
                    flexDirection={'column'}
                    flexWrap={"wrap"}
                    wrap={"wrap"}
                    gap={{ base: 10, md: 10 }}
                >
                    <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />
                    <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />
                    <Button rightIcon={<FaArrowRight />} colorScheme='blue' variant="solid" type='submit'>
                        Iniciar Sesión
                    </Button>
                    <GoogleButton/>

                </Flex>
                <Text textAlign={'center'} mt={5}>
                    ¿Olvidaste tu
                    <Link href={"/"} className=' text-blue-500' > Contraseña</Link>
                    ?
                </Text>
                <Text textAlign={'center'} mt={2}>
                    ¿No Tienes una Cuenta?
                    <Link href={"/register"} className=' text-blue-500' > Registrarse</Link>
                </Text>
            </form>

        </>

    )
}
