"use client"
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Image, Input, Text, useToast } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/helpers/Cookies';
import { obtainUserData } from '@/helpers/Users';

export const EmailVerificationRequired = () => {
    const toast = useToast(); //Notificaciones de feedback
    const [disable, setDisable] = useState<boolean>(false);
    const router = useRouter();

    const resendEmail = async () =>{
        const {data} = await obtainUserData()
       
        if(!data)
            return

        axios.post(process.env.NEXT_PUBLIC_API_URL + '/resend-verification-email/', data)
            .then(async (response) => {
                if (response.status === 200) {
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Verificación de Cuenta',
                            description: "Se Volvio a enviar un Enlace de Verificación a su correo",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    setDisable(true);

                    setTimeout(() => {
                        // Redireccionar al Login
                        router.refresh();
                    }, 3000);
                }
            }).catch((error) => {
                console.log(error);
                if (!toast.isActive("data-update")) {
                  toast({
                      id: "data-update",
                      status: "error",
                      title: 'Verificación de Cuenta',
                      description: "Ha Ocurrido un Error, Intente Nuevamente",
                      position: "top",
                      duration: 5000,
                      isClosable: true,
                  })
              }
               
            })
    }

   

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
                    onClick={async () => await clearToken()}
                >
                    Cerrar Sesión
                </Button>

                <Text
                    color={"#F8F8F8"}
                    fontFamily={"NeutraText-Bold"}
                    fontSize={"2xl"}
                    textAlign={"center"}
                >
                    Necesitas Verificar tu Cuenta
                </Text>
                <Text
                    align={"center"}
                >
                    Le Hemos enviado un enlace a su correo para que verifique su Cuenta
                </Text>

                <Image src={"/images/newsletter.png"} alt='error 404' w={{ base: "full", md: "70%" }} h={{ base: "60%", md: "50%" }} />
                <Text textAlign={"center"}>
                    ¿Problemas al Encontrar el Correo?
                    <Button
                    ml={2}
                    isDisabled={disable}
                    color={"#F8F8F8"}

                    onClick={resendEmail}
                    variant={"link"}
                    type="button">
                    Volver a Enviar Correo
                </Button>

                </Text>
                
            </Flex>



        </Flex  >
    );
};

