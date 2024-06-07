"use client"
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import FormInput from '../atoms/inputs/FormInput';
import { useForm } from 'react-hook-form';
import { EmailIcon } from '@chakra-ui/icons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PasswordRecoverPage = () => {
    const toast = useToast(); //Notificaciones de feedback
    const [disable, setDisable] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); //Loading para indicar que se esta realizando el guardado
    const { handleSubmit, setError, register, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(data => {
        setLoading(true);
        axios.post(process.env.NEXT_PUBLIC_API_URL + '/password-reset/', data)
            .then(async (response) => {
                if (response.status === 200) {
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Recuperación de Contraseña',
                            description: "Se ha Enviado un Enlace de Recuperación al Correo",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    setDisable(true);

                    setTimeout(() => {
                        // Redireccionar al Login
                        router.push('/login');
                    }, 3000);
                }
            }).catch((error) => {
                console.log(error);
                if (error.request.status === 404) {
                    setError("email", { message: "No hay ningun usuario con este email" })
                }
                else{
                    setError("email", { message: "Ha Ocurrido un Error, Intente nuevamente" })
                }
               
            })
            .finally(()=>{
                setLoading(false)
            })
    });

    return (
        <Flex
            flexDirection={"column"}
            height={"100vh"}
            width={"100%"}
            bg={"#141925"}
            justifyContent={"center"}
            color={"gray.300"}
            alignItems={"center"}


        >
            <Flex
                flexDirection={"column"}
                gap={10}
                justifyContent={"center"}
                alignItems={"center"}


                borderRadius={"lg"}
                px={10}
                py={20}
            >

                <Button
                    position="fixed"
                    top="10"
                    left="10"
                    p="2"
                    leftIcon={<ArrowLeft />}
                    _hover={{
                        bg: "#212738",
                        color: "white"
                    }}
                    variant={'ghost'}
                    color={"#F8F8F8"}
                    onClick={() => router.push("login")}
                >
                    Regresar
                </Button>

                <Text
                    color={"#F8F8F8"}
                    fontFamily={"NeutraText-Bold"}
                    fontSize={"2xl"}
                >
                    Recuperación de Contraseña
                </Text>
                <Text
                    align={"center"}
                >
                    Le Enviaremos un Link al correo asociado a su cuenta para poder cambiar la contraseña
                    <br />
                    Por Favor Ingrese el Correo
                </Text>

                <form onSubmit={onSubmit}>

                    <FormInput disable={disable} Icon={<EmailIcon />} label={"Email"} placeholder={"email@example.com"} register={register} errors={errors.email} type='email' namebd='email' />
                </form>
                <Button
                    isLoading={loading}
                    rightIcon={<ArrowRight />}
                    boxShadow="md"
                    isDisabled={disable}
                    color={"white"}
                    bg={"#212738"}
                    colorScheme='blue'
                    onClick={onSubmit}
                    type="submit">
                    Enviar solicitud de restablecimiento
                </Button>
            </Flex>



        </Flex  >
    );
};

