"use client"
import { AbsoluteCenter, Avatar, AvatarBadge, Box, Button, Center, Divider, Flex, IconButton, Input, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorModeValue, useDisclosure, useSteps } from '@chakra-ui/react'
import React, { act, useRef, useState } from 'react'
import FormInput from '@/components/atoms/inputs/FormInput'

import { FaArrowLeft, FaFacebook, FaInstagram, FaInternetExplorer, FaRegFlag, FaRegUser, FaTiktok } from "react-icons/fa";
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
import { Edit2, EyeIcon, Flag } from 'lucide-react';
import { IoLocationOutline } from 'react-icons/io5';
import FormSelect from '@/components/atoms/inputs/FormSelect';
import { BsTwitterX } from 'react-icons/bs';
import { TextEditorRegister } from '@/components/organisms/TextEditorRegister';
import ImageFromPC from '../ImageFromPC';


const GendersOptions: { value: string, label: string }[] = [
    { value: "1", label: "Masculino" },
    { value: "2", label: "Feminino" },
    { value: "3", label: "Otro" },
]

export default function FormRegisterUser() {

    const [step, setStep] = useState(1);
    const { handleSubmit, register, setError, getValues, setValue, watch, formState: { errors }, resetField } = useForm();
    const router = useRouter();
    const allData = watch();
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
        formData.append("first_name", data.first_name);
        formData.append("second_name", data.second_name);
        formData.append("last_name", data.last_name);
        formData.append("second_last_name", data.second_last_name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("nationality", data.nationality);
        formData.append("gender", data.gender?.toString());
        formData.append("cedula", data.cedula);
        formData.append("type", data.type);
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

    // const gender = watch("gender");

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

    const [disable, setDisable] = useState<boolean>();
    const [reload, setReload] = useState<boolean>(false);

    const reloadData = () => {
        setReload(!reload)
    }
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const triggerFileInput = () => {
        inputFileRef.current?.click();
    };

    const [content, setContent] = useState<string>("");

    const handleContentChange = (reason: any) => {
        setContent(reason);
    }

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


                            <StepSeparator style={{
                                backgroundColor:
                                    index <= activeStep - 1 ? '#1F93A5' : 'gray',
                            }} />
                        </Step>
                    ))}

                </Stepper>
                <form className={"mt-10"} onSubmit={onSubmit}>

                    <Tabs variant='soft-rounded' colorScheme='green' index={valueActiveStep}>
                        <TabPanels>
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
                                    {/* <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={gender} /> */}


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

                            <TabPanel>
                                <Flex justifyContent={'space-around'}>
                                    <FormInput Icon={<FaFacebook />} label='Facebook' placeholder='usuario' type='text' register={register} errors={errors.facebook} namebd='facebook' extraValidations={{ minLength: { value: 5, message: "El Facebook tiene que tener minimo 2 caracteres" }, required: false }} />
                                    <FormInput Icon={<FaInstagram />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />
                                    <FormInput Icon={<BsTwitterX />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />

                                </Flex>

                                <Flex justifyContent={'space-around'} mt={'20px'}>

                                    <FormInput Icon={<FaTiktok />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />

                                    <FormInput Icon={<FaInternetExplorer />} label='Página WEB' placeholder='https://mipaginaweb.com' type='url' register={register} errors={errors.url} namebd='url' extraValidations={{ pattern: { value: /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/, message: "Es Obligatorio que la url sea HTTPS:// y que tenga al menos 1 caracter despues del //" }, minLength: { value: 9, message: "URL Invalida" }, required: false }} />
                                    <Box alignContent={"center"} justifyContent={"center"} mt={8}>
                                        <Tooltip label="Vista Previa de la Página WEB">
                                            <Button variant={"unstyled"} onClick={onOpen} _hover={{ textColor: "#1C7987" }} >
                                                <EyeIcon />

                                            </Button>

                                        </Tooltip>
                                    </Box>
                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Flex w={'100%'}>

                                    <ImageFromPC register={register} namebd={"profile_image"} label="Foto de Perfil" getValues={getValues} setValue={setValue} />
                                    <TextEditorRegister
                                        onChange={(newContent: string) => handleContentChange(newContent)}
                                        content={content}
                                    />
                                </Flex>
                            </TabPanel>

                            <TabPanel>
                                <Flex justifyContent={'space-around'}>

                                    <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />

                                    <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.confirm_password} namebd='confirm_password' extraValidations={{ minLength: { value: 8, message: "la contraseña tiene que tener minimo 8 caracteres" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />

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
                                onClick={() =>
                                    setActiveStep(
                                        activeStep >= 0 && activeStep < 5
                                            ? activeStep + 1
                                            : activeStep
                                    )}
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
