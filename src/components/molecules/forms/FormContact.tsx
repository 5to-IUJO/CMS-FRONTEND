"use client"
import { obtainUserData } from '@/helpers/Users';
import { UserDefinition } from '@/interfaces/UserDefinition';
import { Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

interface FormValues {
    nombre: string;
    apellido: string;
    email: string;
    date: string;
    mensaje: string;
}

/**
 * Component for Form Contact on view Contact
 */

export const FormContact = () => {

    const [userData, setUserData] = useState<UserDefinition | undefined>();

    useEffect(() => {
        (async () => {
            const data = await obtainUserData();
            if (data.resp === true)
                setUserData(data.data);
        })();
    }, []);

    const toast = useToast(); //Notificaciones de feedback

    const { register, handleSubmit,
        formState: { errors }
    } = useForm<FormValues >();

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
          
        if (response.status === 200) {
            // Mostrar toast de éxito
            toast({
                title: 'Mensaje enviado',
                description: JSON.stringify(response.data),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        } catch (error) {
            console.error('Error al enviar el formulario: ', error);
            toast({
                title: 'Error al enviar el formulario',
                description: error instanceof Error ? error.message : 'Error desconocido',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex justifyContent={'center'} alignItems={'center'} w={{ base: '300px', sm: '400px', md: '450px', lg: '500px' }} minH={'80%'} bg={'white.500'} borderRadius={'40px'} zIndex={10} flexDirection={'column'} className="boxShadow_NeonBlue" color={'black.400'} py={'20px'}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControl w={{ base: '300px', lg: '400px' }} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} px={'25px'}>
                    <Heading as={'h1'} fontSize={{ base: '38px', lg: '48px' }} w={'100%'} textAlign={'center'} fontFamily={"NeutraText-BoldItalic"}>
                        Contáctanos
                    </Heading>

                    {/* Input Nombre */}
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                        <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'} htmlFor='nombre'>
                            Nombre
                        </FormLabel>
                        <Input
                            type='text'
                            color={'gray.400'}
                            placeholder={'Pepito'}
                            border={'0px'}
                            defaultValue={userData?.first_name ?? ''}
                            _hover={{ bg: '#F5F5F5' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            {...register("nombre", {
                                required: {
                                    value: true,
                                    message: "Nombre es requerido"
                                },
                                minLength: {
                                    value: 2,
                                    message: "Nombre debe tener almenos 2 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Nombre debe tener como maximo 20 caracteres"
                                }
                            })}
                        />
                        <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                        {
                            errors.nombre && (
                                <Text w='100%' color={'red'} fontSize={'14px'}>{errors.nombre.message}</Text>
                            )
                        }
                    </Flex>

                    {/* Input Apellido */}
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                        <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'} htmlFor='apellido'>
                            Apellido
                        </FormLabel>
                        <Input
                            type='text'
                            color={'gray.400'}
                            placeholder={'Perez'}
                            border={'0px'}
                            defaultValue={userData?.last_name ?? ''}
                            _hover={{ bg: '#F5F5F5' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            {...register("apellido")}
                        />
                        <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                    </Flex>

                    {/* Input Correo */}
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                        <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'} htmlFor='email'>
                            Correo
                        </FormLabel>
                        <Input
                            type='email'
                            color={'gray.400'}
                            placeholder={'prueba@prueba.com'}
                            border={'0px'}
                            defaultValue={userData?.email ?? ''}
                            _hover={{ bg: '#F5F5F5' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Correo requerido"
                                }, pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Correo no válido",
                                }
                            })}
                        />
                        <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                        {
                            errors.email && (
                                <Text w='100%' color={'red'} fontSize={'14px'}>{errors.email.message}</Text>
                            )
                        }
                    </Flex>

                    {/* Input Mensaje */}
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                        <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'} htmlFor='mensaje'>
                            Mensaje
                        </FormLabel>
                        <Textarea
                            borderColor={'cyan.400'}
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            resize={'none'}
                            _hover={{ borderColor: 'cyan.400' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            {...register("mensaje", {
                                required: true
                            })}
                        />
                        {
                            errors.mensaje && <Text w='100%' color={'red'} fontSize={'14px'}>Mensaje es requerido</Text>
                        }
                    </Flex>


                    <Button type='submit' w={'120px'} bg={'cyan.300'} color={'white.500'} _hover={{ bg: 'cyan.300' }} _active={{ bg: 'cyan.300' }}>
                        Enviar
                    </Button>
                </FormControl>
            </form>

        </Flex>
    )
}
