"use client"
import Navbar from '../organisms/Navbar'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../atoms/FormInput'
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '../atoms/FormRadioInput';
import { useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';;
import ImageFromPC from '../molecules/ImageFromPC'
import { Tiptap } from '../organisms/TipTap'
import FormCedula from '../atoms/FormCedula'
import FormSelect from '../atoms/FormSelect'



/**
 * Componente para el Editar Perfil del usuario
 * 
 */
export default function ProfileEditPage() {
    const { handleSubmit, register, setError, getValues, watch, setValue,setFocus, resetField, formState: { errors } } = useForm();

    const [addressData, setAddressData] = useState<{ country: string, state: string, city: string, municipality: string, parish: string, postalcode: string }>();
    const router = useRouter();

    // Observar las direcciones del formulario
    const [country, city, state, municipality, parish, postalcode] = watch(["country", "city", "state", "municipality", "parish", "postalcode"]);


    //Useeffect para manejar los select de direccion
    useEffect(() => {

        if (state === "") {
            resetField('city');
            resetField('municipality');
            resetField('parish');
            resetField('postalcode');
        } else if (city === "") {
            resetField('municipality');
            resetField('parish');
            resetField('postalcode');
        } else if (municipality === "") {
            resetField('parish');
            resetField('postalcode');
        }

        setAddressData({ country, city, state, municipality, parish, postalcode })

    }, [country, city, state, municipality, parish, postalcode, resetField]);

    const onSubmit = handleSubmit(async data => {

        if (getValues("password") !== getValues("password_confirm")) {
            setError("password_confirm",{message:"Las Contraseñas no coinciden"})
            setFocus("password_confirm");
            return
        }

        console.log("correcto")


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
                            <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={getValues("gender")} />
                            <FormInput Icon={<FaRegUser />} label='Primer Nombre' placeholder='José' type='text' register={register} errors={errors.name} namebd='name' />
                            <FormInput Icon={<FaRegUser />} label='Segundo Nombre' placeholder='Miguel' type='text' register={register} errors={errors.second_name} namebd='second_name' extraValidations={{ required: false }} />
                            <FormInput Icon={<FaRegUser />} label='Apellido' placeholder='Díaz' type='text' register={register} errors={errors.lastname} namebd='lastname' />
                            <FormInput Icon={<FaRegUser />} label='Segundo Apellido' placeholder='Cruz' type='text' register={register} errors={errors.second_lastname} namebd='second_lastname' extraValidations={{ required: false }} />
                            <FormCedula register={register} errors={errors.cedula} errors2={errors.nationality} />
                            <FormInput Icon={<FaRegUser />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />
                            <FormInput Icon={<FaRegUser />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />
                            <FormInput Icon={<FaRegUser />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />
                            <FormSelect Icon={<FaRegUser />} label='País' table='countries' register={register} errors={errors.country} namebd='country' dependency={addressData ? addressData.country : null} setValues={setValue} />

                            {country && (
                                <FormSelect Icon={<FaRegUser />} label='Estado' table='states' register={register} errors={errors.state} namebd='state' dependency={addressData ? addressData.country : null} setValues={setValue} />
                            )}
                            {state && (
                                <FormSelect Icon={<FaRegUser />} label='Ciudad' table='cities' register={register} errors={errors.city} namebd='city' dependency={addressData ? addressData.state : null} setValues={setValue} />

                            )}
                            {city && (

                                <FormSelect Icon={<FaRegUser />} label='Municipios' table='municipalities' register={register} errors={errors.municipality} namebd='municipality' dependency={addressData ? addressData.city : null} setValues={setValue} />

                            )}
                            {municipality && (

                                <FormSelect Icon={<FaRegUser />} label='Parroquia' table='parishes' register={register} errors={errors.parish} namebd='parish' dependency={addressData ? addressData.municipality : null} setValues={setValue} />
                            )}
                            {parish && (

                                <FormSelect Icon={<FaRegUser />} label='Codigo Postal' table='postalcodes' register={register} errors={errors.postalcode} namebd='postalcode' dependency={addressData ? addressData.parish : null} setValues={setValue} />
                            )}

                            <FormInput Icon={<FaRegUser />} label='Referencia' placeholder='' type='text' register={register} errors={errors.reference} namebd='reference' />


                            <ImageFromPC register={register} namebd='profile_image' label='Avatar' getValues={getValues} setValue={setValue} />

                            <Tiptap content={""} onChange={() => { }} />

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
