"use client"
import { Flex } from '@chakra-ui/react'
import React from 'react'
import FormInput from '../atoms/FormInput'
import { FaInstagram, FaInternetExplorer, FaTiktok } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SaveChangesButton from '../atoms/buttons/SaveChangesButton'
import RestarFormButton from '../atoms/buttons/RestarFormButton'

export default function EditSocialsNetworks() {
    const { handleSubmit, register, setError, getValues, watch, setValue, setFocus, resetField, formState: { errors } } = useForm();
    const onSubmit = handleSubmit(async data => {

        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", data)
            .then(async (response) => {

                if (response.status === 201) {

                }
            }).catch((error) => {
                console.log(error);


            })


    });
    return (
        <form className={"mt-10"} onSubmit={onSubmit} encType="multipart/form-data">
            <Flex
                flexDirection={'row'}
                flexWrap={"wrap"}
                wrap={"wrap"}
                gap={{ base: 10, md: 10 }}
                mb={10}

            >
                <FormInput Icon={<FaInstagram />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<BsTwitterX />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<FaTiktok />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<FaInternetExplorer />} label='Página WEB' placeholder='https://mipaginaweb.com' type='url' register={register} errors={errors.web} namebd='web' extraValidations={{ pattern: { value: /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/, message: "Es Obligatorio que la url sea HTTPS:// y que tenga al menos 1 caracter despues del //" }, minLength: { value: 9, message: "URL Invalida" }, required: false }} />
            </Flex>
            <SaveChangesButton/>
            <RestarFormButton/>
        </form>
    )
}
