"use client"
import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormInput from '@/components/atoms/inputs/FormInput'
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';
import GoogleButton from '@/components/atoms/buttons/GoogleButton';

export default function FormLogin() {

    const { handleSubmit, setError, register, formState: { errors } } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const onSubmit = handleSubmit(data => {
        setLoading(true)
        axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", data)
            .then(async (response) => {
                if (response.status === 200) {
                    await saveToken(response.data.token);
                    router.push("/dashboard");
                }
            }).catch((error) => {
                console.log(error);
                setError("password", { message: "Datos Invalidos, Intente Nuevamente" })
            }).finally(()=>{
                setLoading(false);
            })
    });

    return (
        <>
            <Text
                textAlign={'center'}
                fontSize={{ base: "3xl", md: "36px" }}
                fontWeight={"bold"}
                color={"black.400"}
            >
                Inicio Sesión
            </Text>

            <form className={"mt-1"} onSubmit={onSubmit}>
                <Flex
                    flexDirection={'column'}
                    flexWrap={"wrap"}
                    wrap={"wrap"}
                    gap={{ base: 10, md: 10 }}

                >
                    <FormInput Icon={<FaRegUser />} forceColor={"black.400"} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />
                    <FormInput Icon={<RiLockPasswordLine />} forceColor={"black.400"} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />
                    <Button rightIcon={<FaArrowRight />} className='buttonNeon3'  bgColor={'darkBlue.700'} isLoading={loading} variant="solid" type='submit' _hover={{ bgColor: 'darkBlue.700' }} _active={{ bgColor: 'darkBlue.700' }} color={'white.400'}>
                        Iniciar Sesión
                    </Button>
                    <GoogleButton />

                </Flex>
                <Text textAlign={'center'} mt={5} color={"black.400"}>
                    ¿Olvidaste tu
                    <Link href={"/password-recover"} className='text-blue-500'> Contraseña</Link>
                    ?
                </Text>
                <Text textAlign={'center'} mt={2} color={"black.400"}>
                    ¿No Tienes una Cuenta?
                    <Link href={"/register"} className=' text-blue-500'> Registrarse</Link>
                </Text>
            </form>

        </>

    )
}
