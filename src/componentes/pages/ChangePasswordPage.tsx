"use client"
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import FormInput from '../atoms/inputs/FormInput';
import { useForm } from 'react-hook-form';
import { EmailIcon } from '@chakra-ui/icons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiLockPasswordLine } from 'react-icons/ri';

export const ChangePasswordPage = () => {
    const toast = useToast(); //Notificaciones de feedback
    const [disable, setDisable] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const { handleSubmit, setError, register,getValues, formState: { errors } } = useForm();
    const router = useRouter();

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const uid = searchParams.get('uid')

    if (!uid || !token)
        router.push("/login")

    const onSubmit = handleSubmit(data => {

        if (getValues("password") !== getValues("confirm_password")) {
            setError("confirm_password", { message: "Las Contraseñas no coinciden" });
            return
        }

        axios.post(process.env.NEXT_PUBLIC_API_URL + `/password-reset-confirm/${uid}/${token}/`, data)
            .then(async (response) => {
                if (response.status === 200) {
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Recuperación de Contraseña',
                            description: "La Contraseña se ha cambiado Correctamente",
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
                setError("email", { message: "Ha Ocurrido un Error, Intente nuevamente" })
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


                <form onSubmit={onSubmit}>

                    <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Nueva Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />
                    <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.confirm_password} namebd='confirm_password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />
                </form>
                <Button
                    rightIcon={<ArrowRight />}
                    boxShadow="md"
                    isDisabled={disable}
                    color={"white"}
                    bg={"#212738"}
                    colorScheme='blue'
                    onClick={onSubmit}
                    type="submit">
                    Cambiar Contraseña
                </Button>
            </Flex>



        </Flex  >
    );
};

