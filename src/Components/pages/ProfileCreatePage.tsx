"use client"
import Navbar from '../organisms/Navbar'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../atoms/inputs/FormInput'
import { FaArrowLeft, FaInternetExplorer, FaRegFlag, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '../atoms/inputs/FormRadioInput';
import { useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';;
import ImageFromPC from '../molecules/ImageFromPC'
import { Tiptap } from '../organisms/TipTap'
import FormCedula from '../atoms/inputs/FormCedula'
import FormSelect from '../atoms/inputs/FormSelect'
import axios from 'axios'
import { Flag } from 'lucide-react'
import FormSelectNationalities from '../atoms/inputs/FormSelectNationalities'
import { IoLocationOutline } from 'react-icons/io5'



/**
 * PAGINA TEMPORAL PARA AGREGAR USUARIOS
 * 
 */
export default function ProfileCreatePage() {
    const { handleSubmit, register, setError, getValues, watch, setValue, setFocus, resetField, formState: { errors } } = useForm();

    const [addressData, setAddressData] = useState<{ country: string, state: string, city: string, municipality: string, parish: string, postalcode: string }>();
    const router = useRouter();

    //Editor de Texto
    const [description, setDescription] = useState<string>("");

    const handleContentChange = (reason: any) => {
        setDescription(reason);
    }

    // Observar las direcciones del formulario
    const [country, city, state, municipality, parish, postalcode] = watch(["country", "city", "state", "municipality", "parish", "postalcode"]);


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


    const onSubmit = handleSubmit(async data => {

        if (getValues("password") !== getValues("password_confirm")) {
            setError("password_confirm", { message: "Las Contraseñas no coinciden" })
            setFocus("password_confirm");
            return
        }

        //* Se Guarda en un Form DATA para poder enviar la posible foto de perfil del usuario
        const formData = new FormData();
       
        if (data.profile_image[0])
            formData.append("profile_image", data.profile_image[0]);

        formData.append("first_name", data.name);
        formData.append("second_name", data.second_name);
        formData.append("last_name", data.lastname);
        formData.append("second_last_name", data.second_lastname);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("type", data.type);
        formData.append("url", data.web);
        formData.append("cedula", data.cedula);
        formData.append("nationality", data.countries_nationality);
        formData.append("email", data.email);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("gender", data.gender);
        formData.append("instagram", data.instagram);
        formData.append("x", data.x);
        formData.append("tiktok", data.tiktok);
        const address: {} = {
            country: data.country,
            state: data.state,
            city: data.city,
            municipality: data.municipality,
            parish: data.parish,
            postalcode: data.postalcode,
            reference: data.country,
        }

        formData.append("address", JSON.stringify(address));
        formData.append("description", description);



        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", formData)
            .then(async (response) => {

                if (response.status === 201) {

                }
            }).catch((error) => {
                console.log(error);


            })


    });

    return (
        <>
            <Navbar />
            <Box
                p={5}
            >
                <Text
                    textAlign={'center'}
                    fontSize={{ base: "3xl", md: "xl" }}
                    fontWeight={"bold"}
                >
                    Editar Perfil
                </Text>

                <form className={"mt-10"} onSubmit={onSubmit} encType="multipart/form-data">
                    <Flex
                        flexDirection={'row'}
                        flexWrap={"wrap"}
                        wrap={"wrap"}
                        gap={{ base: 10, md: 10 }}
                        mb={10}

                    >

                        <>
                            <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />
                            <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.old_password} namebd='old_password' />
                            <FormInput Icon={<RiLockPasswordLine />} label='Nueva Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />
                            <FormInput Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.password_confirm} namebd='password_confirm' />
                            <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />
                            <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' />
                            <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={"asd"} />
                            <FormInput Icon={<FaRegUser />} label='Primer Nombre' placeholder='José' type='text' register={register} errors={errors.name} namebd='name' />
                            <FormInput Icon={<FaRegUser />} label='Segundo Nombre' placeholder='Miguel' type='text' register={register} errors={errors.second_name} namebd='second_name' extraValidations={{ required: false }} />
                            <FormInput Icon={<FaRegUser />} label='Apellido' placeholder='Díaz' type='text' register={register} errors={errors.lastname} namebd='lastname' />
                            <FormInput Icon={<FaRegUser />} label='Segundo Apellido' placeholder='Cruz' type='text' register={register} errors={errors.second_lastname} namebd='second_lastname' extraValidations={{ required: false }} />
                            <FormCedula register={register} errors={errors.cedula} errors2={errors.nationality} />
                            <FormInput Icon={<FaRegUser />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />
                            <FormInput Icon={<FaRegUser />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />
                            <FormInput Icon={<FaRegUser />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />

                            <FormInput Icon={<FaInternetExplorer />} label='Página WEB' placeholder='https://mipaginaweb.com' type='url' register={register} errors={errors.web} namebd='web' extraValidations={{ pattern: { value: /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/, message: "Es Obligatorio que la url sea HTTPS:// y que tenga al menos 1 caracter despues del //" }, minLength: { value: 9, message: "URL Invalida" }, required: false }} />
                            <FormSelectNationalities Icon={<Flag />} label='Nacionalidad' table='countries_nationality' register={register} errors={errors.countries_nationality} namebd='countries_nationality' setValues={setValue} />
                            <FormSelect Icon={<FaRegFlag />} label='País' table='countries' register={register} errors={errors.country} namebd='country' onChange={handleSelectChange} setValues={setValue} />

                            {getValues("country") && (
                                <FormSelect Icon={<IoLocationOutline />} label='Estado' table='states' register={register} errors={errors.state} namebd='state' dependency={getValues("country")} onChange={handleSelectChange} setValues={setValue} />
                            )}
                            {getValues("state") && (
                                <FormSelect Icon={<IoLocationOutline />} label='Ciudad' table='cities' register={register} errors={errors.city} namebd='city' dependency={getValues("state")} onChange={handleSelectChange} setValues={setValue} />

                            )}
                            {getValues("city") && (
                                <FormSelect Icon={<IoLocationOutline />} label='Municipios' table='municipalities' register={register} errors={errors.municipality} namebd='municipality' dependency={getValues("city")} onChange={handleSelectChange} setValues={setValue} />
                            )}
                            {getValues("municipality") && (

                                <FormSelect Icon={<IoLocationOutline />} label='Parroquia' table='parishes' register={register} errors={errors.parish} namebd='parish' dependency={getValues("muniicipality")} onChange={handleSelectChange} setValues={setValue} />
                            )}








                            <FormInput Icon={<IoLocationOutline />} label='Referencia' placeholder='' type='text' register={register} errors={errors.reference} namebd='reference' />


                            <ImageFromPC register={register} namebd='profile_image' label='Avatar' getValues={getValues} setValue={setValue} />

                            <Tiptap
                                content={description}
                                onChange={(newContent: string) => handleContentChange(newContent)}
                            />

                        </>





                    </Flex>

                    <Button rightIcon={<FaArrowRight />} colorScheme='blue' variant="solid" type='submit'>
                        Registrarse
                    </Button>
                </form>

            </Box>

        </>

    )
}