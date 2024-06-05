

"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Flex, Spinner,  useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

export const EmailVerification = () => {
    const toast = useToast(); //Notificaciones de feedback
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {

        const token = searchParams.get('token')
        if (token) {
            //Se valida el token en el backend
            axios.get(process.env.NEXT_PUBLIC_API_URL + "/verify-email/" + token)
                .then(response => {
                    if (response.data.verified) {
                        if (!toast.isActive("data-update")) {
                            toast({
                                id: "data-update",
                                status: "success",
                                title: 'Verificación de Cuenta',
                                description: "Su Cuenta ha Sido Verificada Correctamente",
                                position: "top",
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    }
                })
                .catch(error => {
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "error",
                            title: 'Verificación de Cuenta',
                            description: "Ha Ocurrido un Error, intentelo nuevamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                })
                .finally(() => {

                    setLoading(false);
                });;
        }
        else {
            setLoading(false);
            if (!toast.isActive("data-update")) {
                toast({
                    id: "data-update",
                    status: "error",
                    title: 'Verificación de Cuenta',
                    description: "Ha Ocurrido un Error, intentelo nuevamente",
                    position: "top",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        setTimeout(() => {
            // Redireccionar al Login
            router.push("/dashboard");
        }, 1500);
    }, []);




    return (
        <Flex
            flexDirection={"column"}
            height={"100vh"}
            width={"100%"}
            bg={"#141925"}
            justifyContent={"center"}
            color={"gray.300"}
            alignItems={"center"}
            maxH={"100vh"}
            overflow={"hidden"}

        >
            {loading && (
                <Spinner
                    thickness='4px'
                    speed='0.55s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            )}




        </Flex  >
    );
};

