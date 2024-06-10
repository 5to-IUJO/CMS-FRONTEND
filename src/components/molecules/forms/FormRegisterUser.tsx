"use client"
import { AbsoluteCenter, Avatar, AvatarBadge, Box, Button, Flex, Step,  StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorModeValue, useDisclosure, useSteps, useToast } from '@chakra-ui/react'
import React, {  useState } from 'react'
import FormInput from '@/components/atoms/inputs/FormInput'

import { FaFacebook, FaInstagram, FaInternetExplorer, FaRegFlag, FaRegUser, FaTiktok } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';
import { validateDateOfBirth } from '@/helpers/Utilities';
import FormCedula from '@/components/atoms/inputs/FormCedula';
import FormSelectNationalities from '@/components/atoms/inputs/FormSelectNationalities';
import {  EyeIcon, Flag } from 'lucide-react';
import { IoLocationOutline } from 'react-icons/io5';
import FormSelect from '@/components/atoms/inputs/FormSelect';
import { BsTwitterX } from 'react-icons/bs';
import { TextEditorRegister } from '@/components/organisms/TextEditorRegister';
import FormRadioInput from '@/components/atoms/inputs/FormRadioInput';
import WebPreview from '@/components/organisms/modals/WebPreview';
import ImageFromPC from '../ImageFromPC';

//Constante que almacena el nombre de todos los campos utilizados en cada Paso del Registro,
const inputToValidate: { [key: string]: string[]; } = {
    0: ["first_name", "second_name", "last_name", "second_last_name", "username", "email"],
    1: ["date_of_birth", "nationality", "cedula", "type", "gender"],
    2: ["country", "reference", "state", "city", "municipality", "parish"],
    3: ["facebook", "x", "instagram", "tiktok", "url"],
    4: ["profile_image"],
    5: ["password", "confirm_password"]
}

export default function FormRegisterUser() {

    const { handleSubmit, register, setError, getValues, trigger, setValue, watch, getFieldState, formState: { errors }, resetField } = useForm();
    const router = useRouter();
    const allData = watch();
    const toast = useToast(); //Notificaciones de feedback
    const [loading, setLoading] = useState<boolean>(false); //Loading para indicar que se esta realizando el guardado

    //Funcion que valida que existan los diferentes campos al intentar avanazar en los pasos
    const ValidateDataStep = async (step: number) => {
        step = step - 1

        //Ciclo para Comprobar si los input anteriores al paso que se quiere ir son validos
        for (let i = 0; i <= step; i++) {
            if (!await trigger(inputToValidate[i])) {
                //Input Invalido, se redirecciona a ese paso 
                setActiveStep(i)
                return;

            }

        }
        setActiveStep(step + 1)
    }

    //Funcion para enviar los datos a la api y efectuar el registro
    const onSubmit = handleSubmit(async data => {
        
        if (getValues("password") !== getValues("confirm_password")) {
            setError("confirm_password", { message: "Las Contraseñas no coinciden" });
            return
        }
        
        setLoading(true)
        
        const address = {
            country: data.country,
            state: data.state,
            city: data.city,
            municipality: data.municipality,
            parish: data.parish,
            reference: data.reference
        }

        //* Se Guarda en un Form DATA para poder enviar la posible foto de perfil del usuario
        const formData = new FormData();
        if (data.profile_image[0])
            formData.append("profile_image", data.profile_image[0]);

        if (data.url && data.urlImage)
            formData.append("urlImage", data.urlImage);

        formData.append("username", data.username);
        formData.append("first_name", data.first_name);
        formData.append("second_name", data.second_name);
        formData.append("last_name", data.last_name);
        formData.append("second_last_name", data.second_last_name);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("nationality", data.nationality);
        formData.append("address", JSON.stringify(address));
        formData.append("facebook", data.facebook);
        formData.append("x", data.x);
        formData.append("tiktok", data.tiktok);
        formData.append("url", data.url);
        formData.append("password", data.password);
        formData.append("confirm_password", data.confirm_password);
        formData.append("cedula", data.cedula);
        formData.append("type", data.type);
        formData.append("terms", data.terms);
        formData.append("description", content);
        formData.append("gender", data.gender.toString());


        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", formData)
            .then(async (response) => {

                if (response.status === 201) {
                    await saveToken(response.data.token);
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Registro',
                            description: "Te has Registrado Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    router.push("/dashboard");
                }
            }).catch((error) => {
                console.log(error);
                const errorResponse = JSON.parse(error.request.responseText);
                let errorMessage;
                // Verifica si el campo "responseText" existe
                if (errorResponse) {
                    // Acceder al mensaje de error 
                    errorMessage = errorResponse[Object.keys(errorResponse)[0]]

                    //Si sigue siendo un objeto, se vuelve a obtener el texto de la primer propiedad
                    if (typeof errorMessage === "object")
                        errorMessage = errorMessage[Object.keys(errorMessage)[0]]

                }

                //Alerta de Modificacion Incorrecta
                if (!toast.isActive("data-update")) {
                    toast({
                        id: "data-update",
                        status: "error",
                        title: 'Registro',
                        description: `Ha Ocurrido un al Registrarte, ${errorMessage ? errorMessage : ""}`,
                        position: "top",
                        duration: 5500,
                        isClosable: true,
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    });

    // Indice de Pasos del Formulario 
    const steps = [
        { title: 'Datos Personales' },
        { title: 'Datos Legales' },
        { title: 'Direccion' },
        { title: 'Redes Sociales' },
        { title: 'Perfil' },
        { title: 'Seguridad' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const valueActiveStep = activeStep;

    //Al cambiar los datos en un select, resetea los campos del formulario pertienentes
    const handleSelectChange = (selectName: string) => {

        if (selectName === "countries") {
            resetField('state');
            resetField('city');
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "states") {
            resetField('city');
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "cities") {
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "municipality") {
            resetField('parish');
        }

    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [content, setContent] = useState<string>("");

    const handleContentChange = (reason: any) => {
        setContent(reason);
    }

    return (
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100%'} color={"black.400"} >

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

            <Box bgColor={'white.400'} w={'100%'} h={'100%'} >

                <Stepper size='lg' index={activeStep} w={'90%'} m={'auto'} color={"red"} >

                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => ValidateDataStep(index)} hidden={index > 2 && activeStep <3 || index < 3 && activeStep > 2}>
                            <Box flexShrink='0'  color={"black.400"} >
                                <StepTitle> <Text whiteSpace={"nowrap"}>{step.title}</Text></StepTitle>
                                {/* <StepDescription>{step.description}</StepDescription> */}
                            </Box>


                            <StepIndicator cursor={'pointer'} bg={'cyan.400'} color={'white.400'} fontWeight={'bold'} border={'none'}>
                                <StepStatus
                                    complete={<StepIcon bg={'cyan.400'} background={'cyan.400'} color={"white.400"} />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>


                            <StepSeparator style={{
                                backgroundColor:
                                    index <= activeStep - 1 ? '#1F93A5' : 'gray',
                            }} />
                        </Step>
                    ))}

                </Stepper>
                <form className={"mt-10"} onSubmit={onSubmit}>

                    <Tabs variant='soft-rounded' colorScheme='green' index={valueActiveStep} >
                        <TabPanels >
                            <TabPanel>
                                <Flex justifyContent={'space-around'}>
                                    <FormInput Icon={<FaRegUser />} forceColor={"black.400"} label='Primer Nombre' placeholder='José' type='text' register={register} errors={errors.first_name} namebd='first_name' obligatory={true} />

                                    <FormInput Icon={<RiLockPasswordLine />} forceColor={"black.400"} label='Segundo Nombre' placeholder='Miguel' type='text' register={register} errors={errors.second_name} namebd='second_name' extraValidations={{ required: false }} />

                                    <FormInput Icon={<MdOutlineEmail />} forceColor={"black.400"} label='Apellido' placeholder='Díaz' type='text' register={register} errors={errors.last_name} namebd='last_name' obligatory={true} />

                                </Flex>

                                <Flex justifyContent={'space-around'} mt={'20px'}>
                                    <FormInput Icon={<CiCalendarDate />} forceColor={"black.400"} label='Segundo Apellido' placeholder='Cruz' type='text' register={register} errors={errors.second_last_name} namebd='second_last_name' extraValidations={{ required: false }} />

                                    <FormInput Icon={<MdOutlineEmail />} forceColor={"black.400"} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' obligatory={true} />

                                    <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' obligatory={true} />
                                </Flex>

                            </TabPanel>

                            <TabPanel>
                                <Flex justifyContent={'space-around'}>
                                    <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' extraValidations={{ validate: { validDate: (value: Date) => validateDateOfBirth(value) || ` No es una Fecha Válida de Nacimiento` } }} obligatory={true} />

                                    <FormCedula register={register} errors={errors.cedula} errors2={errors.types} obligatory={true} />

                                    <FormSelectNationalities Icon={<Flag />} label='Nacionalidad' table='nationality' register={register} errors={errors.nationality} namebd='nationality' setValues={setValue} />


                                </Flex>

                                <Flex justifyContent={'space-around'} mt={'20px'}>

                                    <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={" "} />

                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Flex justifyContent={'space-around'}>
                                    <FormSelect Icon={<FaRegFlag />} label='País' table='countries' register={register} errors={errors.country} namebd='country' onChange={handleSelectChange} setValues={setValue} />

                                    {allData.country && (
                                        <FormSelect Icon={<IoLocationOutline />} label='Estado' table='states' register={register} errors={errors.state} namebd='state' dependency={allData.country} onChange={handleSelectChange} setValues={setValue} />
                                    )}
                                    {allData.state && (
                                        <FormSelect Icon={<IoLocationOutline />} label='Ciudad' table='cities' register={register} errors={errors.city} namebd='city' dependency={allData.state} onChange={handleSelectChange} setValues={setValue} />

                                    )}


                                </Flex>

                                <Flex justifyContent={'space-around'} mt={'20px'}>
                                    {allData.city && (
                                        <FormSelect Icon={<IoLocationOutline />} label='Municipio' table='municipalities' register={register} errors={errors.municipality} namebd='municipality' dependency={allData.city} onChange={handleSelectChange} setValues={setValue} />
                                    )}
                                    {allData.municipality && (

                                        <FormSelect Icon={<IoLocationOutline />} label='Parroquia' table='parishes' register={register} errors={errors.parish} namebd='parish' dependency={allData.municipality} onChange={handleSelectChange} setValues={setValue} />
                                    )}

                                    <FormInput Icon={<IoLocationOutline />} label='Referencia' placeholder='Avenida, Calle...' type='text' register={register} errors={errors.reference} namebd='reference' />
                                </Flex>
                            </TabPanel>

                            <TabPanel >
                                <Flex justifyContent={'space-around'} flexWrap={"wrap"}>
                                    <FormInput Icon={<FaFacebook />} label='Facebook' placeholder='usuario' type='text' register={register} errors={errors.facebook} namebd='facebook' extraValidations={{ minLength: { value: 5, message: "El Facebook tiene que tener minimo 2 caracteres" }, required: false }} />
                                    <FormInput Icon={<FaInstagram />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />

                                    <FormInput Icon={<BsTwitterX />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />

                                </Flex>

                                <Flex justifyContent={"space-around"} mt={'20px'} flexWrap={"wrap"}>

                                    <FormInput Icon={<FaTiktok />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />
                                    <Flex>
                                        <FormInput Icon={<FaInternetExplorer />} label='Página WEB' placeholder='https://mipaginaweb.com' type='url' register={register} errors={errors.url} namebd='url' extraValidations={{ pattern: { value: /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/, message: "Es Obligatorio que la url sea HTTPS:// y que tenga al menos 1 caracter despues del //" }, minLength: { value: 9, message: "URL Invalida" }, required: false,  maxLength: { value: 256, message: "La URL puede tener máximo 256 caracteres" }, }} />
                                        <Box alignContent={"center"} justifyContent={"center"} mt={8}>
                                            <Tooltip label="Vista Previa de la Página WEB">
                                                <Button variant={"unstyled"} onClick={onOpen} _hover={{ textColor: "#1C7987" }} >
                                                    <EyeIcon />

                                                </Button>

                                            </Tooltip>
                                        </Box>
                                    </Flex>
                                    <WebPreview isOpen={isOpen} onClose={onClose} url={getValues("url")} image={setValue} userData={{ url: '', urlImage: '' }} />
                                </Flex>
                            </TabPanel>

                            <TabPanel >
                                <Flex w={'100%'} justifyContent={'space-around'}>
                                    <Flex flexDir={"column"} minW={"40%"}>
                                        <Text textAlign={"center"} fontSize={{ base: "sm", md: 'lg', xl: "xl" }} mb={2}>Foto de Perfil</Text>
                                        <ImageFromPC register={register} namebd={"profile_image"} label="Foto de Perfil" getValues={getValues} setValue={setValue} />

                                    </Flex>

                                    <TextEditorRegister
                                        onChange={(newContent: string) => handleContentChange(newContent)}
                                        content={content}
                                    />
                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Flex justifyContent={'space-around'}>

                                    <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />

                                    <FormInput Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.confirm_password} namebd='confirm_password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />

                                </Flex>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    {/* Form Buttons */}
                    <Flex w={'100%'} justifyContent={'center'} bottom={5} position={'absolute'} gap={5} flexDir={'column'}>

                        <Text textAlign={'center'} color={"black.400"}>
                            ¿Ya tienes una Cuenta?
                            <Link href={"/login"} className=' text-blue-500' > Iniciar Sesión</Link>
                        </Text>

                        <Flex justifyContent={'center'} gap={5} alignItems={'center'}>

                            <Button
                                isDisabled={activeStep === 0}
                                onClick={() =>
                                    setActiveStep(
                                        activeStep <= 5 && activeStep > 0
                                            ? activeStep - 1
                                            : activeStep
                                    )}
                                w={'120px'}
                                color={'white.400'}
                                bgColor={'darkBlue.400'}
                                _hover={{ bgColor: 'darkBlue.400' }}
                                _active={{ bgColor: 'darkBlue.400' }}
                            >
                                {activeStep <= 5 ? "Anterior" : ""}
                            </Button>

                            <Button
                                rightIcon={<FaArrowRight />}
                                onClick={async () => await ValidateDataStep(activeStep >= 0 && activeStep < 5 ? activeStep + 1 : activeStep)}
                                w={'120px'}
                                color={'white.400'}
                                bgColor={'darkBlue.400'}
                                _hover={{ bgColor: 'darkBlue.400' }}
                                _active={{ bgColor: 'darkBlue.400' }}
                                display={activeStep === 5 ? 'none' : 'block'}
                            >
                                Siguiente
                            </Button>

                            <Button
                                isLoading={loading}
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
                                _hover={{ bgColor: 'darkBlue.700' }}
                                _active={{ bgColor: 'darkBlue.400' }}
                                display={activeStep === 5 ? 'block' : 'none'}
                            >
                                Registrarse
                            </Button>
                        </Flex>
                    </Flex>

                </form>
            </Box>
        </Flex>
    )
}
