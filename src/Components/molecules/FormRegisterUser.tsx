"use client"
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormInput from '../atoms/FormInput'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
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
import GoogleButton from '../atoms/GoogleButton';
import ImageFromPC from './ImageFromPC';


const GendersOptions: { value: string, label: string }[] = [
    { value: "1", label: "Masculino" },
    { value: "2", label: "Feminino" },
    { value: "3", label: "Otro" },
]

export default function FormRegisterUser() {

    const [step, setStep] = useState(1);
    const { handleSubmit, register, setError, getValues, setValue, formState: { errors } } = useForm();
    const router = useRouter();
    //Funcion para enviar los datos a la api y efectuar el registro
    const onSubmit = handleSubmit(async data => {
        if (step === 1) {
            setStep(2)
            return;
        }


        //* Se Guarda en un Form DATA para poder enviar la posible foto de perfil del usuario
        const formData = new FormData();
       
        if(data.profile_image[0])
            formData.append("profile_image", data.profile_image[0]);
        
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("email", data.email);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("gender", data.gender);
        formData.append("terms", data.terms);

      
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", formData)
            .then(async (response) => {

                if (response.status === 201) {
                    await saveToken(response.data.token);
                    router.push("/dashboard");
                }
            }).catch((error) => {
                console.log(error);
                if ('username' in error.response.data)
                    setError("username", { message: "Ya Existe un Usuario con Este Nombre" })

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

            <form className={"mt-10"} onSubmit={onSubmit}  encType="multipart/form-data">
                <Flex
                    flexDirection={'column'}
                    flexWrap={"wrap"}
                    wrap={"wrap"}
                    gap={{ base: 10, md: 10 }}
                >
                    {step === 1 && (
                        <>
                            <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />
                            <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />
                            <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />
                            <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' />
                            <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={getValues("gender")} />
                            <FormCheckInput label='Acepto los Terminos y Condiciones' register={register} errors={errors.terms} namebd='terms' />

                            <Button rightIcon={<FaArrowRight />} colorScheme='blue' variant="solid" type='submit'>
                                   Registrarse
                            </Button>

                            <GoogleButton />
                            <Text textAlign={'center'}>
                                ¿Ya tienes una Cuenta?
                                <Link href={"/login"} className=' text-blue-500' > Iniciar Sesión</Link>
                            </Text>

                        </>
                    )}

                    {step === 2 && (
                        <>
                            <ImageFromPC register={register} namebd='profile_image' label='Avatar' getValues={getValues} setValue={setValue}  />
                        
                            <Stack direction={['column', 'row']} spacing={10}>
                                <Button leftIcon={<FaArrowLeft />} w={{ base: "100%", md: "30%" }}  colorScheme={'red'} _hover={{bg:"#FC8181", textColor:"white"}} bg={"white"} textColor={'black'} variant="solid" type='button' onClick={()=>setStep(1)}>
                                Regresar
                                </Button>
                                <Button rightIcon={<FaArrowRight />} w={{ base: "100%", md: "50%" }} colorScheme='blue' variant="solid" type='submit'>
                                   Terminar Registro
                                </Button>
                            </Stack>
                        </>
                    )}


                </Flex>
            </form>

        </>

    )
}
