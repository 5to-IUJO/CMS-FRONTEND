"use client"
import { Box, Button, Flex, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useSteps } from '@chakra-ui/react'
import React, { act, useState } from 'react'
import FormInput from '../../atoms/inputs/FormInput'

import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '../../atoms/inputs/FormRadioInput';
import FormCheckInput from '../../atoms/inputs/FormCheckInput';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';
import GoogleButton from '../../atoms/buttons/GoogleButton';
import ImageFromPC from '../ImageFromPC';


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

        if (data.profile_image[0])
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

    const steps = [
        { title: 'Personal', description: 'Datos Personales' },
        { title: 'Direccion', description: 'Addres' },
        { title: 'Descripcion y Redes', description: 'Select Rooms' },
        { title: 'Blogger', description: 'Select Rooms' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const valueActiveStep = activeStep;

    return (
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100%'} color={"black.400"}>

            <Flex
                w={'100%'}
                h={'120px'}
                justifyContent={'center'}
                alignItems={'center'}
                border={'20px solid #fff'}
                borderRadius={'60px 60px 0px 0px'}
                
            >
                <Text
                    textAlign={'center'}
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight={"bold"}
                    color={'white.400'}
                >
                    Unete a nuestro equipo - Paso {valueActiveStep + 1}
                </Text>
            </Flex>

            <Box bgColor={'white.400'} w={'100%'} h={'100%'}>

                <Stepper size='lg' index={activeStep} w={'90%'} m={'auto'} color={"red"} >

                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => setActiveStep(index)}>
                            <Box flexShrink='0' maxW={'100px'} color={"black.400"} >
                                <StepTitle>{step.title}</StepTitle>
                                {/* <StepDescription>{step.description}</StepDescription> */}
                            </Box>


                            <StepIndicator cursor={'pointer'} bg={'cyan.400'} color={'white.400'} fontWeight={'bold'} border={'none'}>
                                <StepStatus
                                    complete={<StepIcon bg={'cyan.400'} background={'cyan.400'} color={"white.400"} />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>


                            <StepSeparator sx={{
                                backgroundColor:
                                    index < activeStep - 1 ? 'green' : index === activeStep - 1 ? 'cyan.400' : 'gray.500',
                                }} />
                            </Step>
                    ))}

                </Stepper>
                <form className={"mt-10"} onSubmit={onSubmit}>

                    <Tabs variant='soft-rounded' colorScheme='green' index={valueActiveStep}>
                        <TabPanels>
                            <TabPanel>
                                <Flex justifyContent={'space-around'}>
                                    <FormInput Icon={<FaRegUser />} forceColor={"black.400"} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />

                                    <FormInput Icon={<RiLockPasswordLine />} forceColor={"black.400"} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />

                                    <FormInput Icon={<MdOutlineEmail />} forceColor={"black.400"} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />

                                </Flex>

                                <Flex justifyContent={'space-around'}>
                                    <FormInput Icon={<CiCalendarDate />} forceColor={"black.400"} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' />

                                    {/* <FormRadioInput label='Genero' data={GendersOptions} register={register} errors={errors.gender} namebd='gender' /> */}

                                    <FormInput Icon={<MdOutlineEmail />} forceColor={"black.400"} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />

                                    <FormCheckInput label='Acepto los Terminos y Condiciones' forceColor={"black.400"} register={register} errors={errors.terms} namebd='terms' />

                                </Flex>

                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>four!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    {/* Form Buttons */}
                    <Flex w={'100%'} justifyContent={'center'} bottom={5} position={'absolute'} gap={5}>
                        <Button
                            isDisabled={activeStep === 0}
                            onClick={() =>
                                setActiveStep(
                                    activeStep <= 3 && activeStep > 0
                                        ? activeStep - 1
                                        : activeStep
                                )}
                            w={'120px'}
                            color={'white.400'}
                            bgColor={'darkBlue.400'}
                            _hover={{ bgColor: 'darkBlue.400' }}
                            _active={{ bgColor: 'darkBlue.400' }}
                        >
                            {activeStep <= 3 ? "Anterior" : ""}
                        </Button>

                        <Button
                            rightIcon={<FaArrowRight />}
                            type='submit'
                            onClick={() =>
                                setActiveStep(
                                    activeStep >= 0 && activeStep < 3
                                        ? activeStep + 1
                                        : activeStep
                                )}
                            w={'120px'}
                            color={'white.400'}
                            bgColor={'darkBlue.400'}
                            _hover={{ bgColor: 'darkBlue.400' }}
                            _active={{ bgColor: 'darkBlue.400' }}

                        >
                            {activeStep === 3 ? "Registrarse" : "Siguiente"}
                        </Button>
                    </Flex>

                </form>

                <Flex
                    flexDirection={'column'}
                    flexWrap={"wrap"}
                    wrap={"wrap"}
                    gap={{ base: 10, md: 10 }}
                >
                    <Text textAlign={'center'} color={"black.400"}>
                        ¿Ya tienes una Cuenta?
                        <Link href={"/login"} className=' text-blue-500' > Iniciar Sesión</Link>
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}
