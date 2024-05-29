"use client"
import { Flex } from '@chakra-ui/react'
import React from 'react'
import FormInput from '../atoms/FormInput'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SaveChangesButton from '../atoms/buttons/SaveChangesButton'
import RestarFormButton from '../atoms/buttons/RestarFormButton'

export default function EditSecurityData() {
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
                <FormInput Icon={<RiLockPasswordLine />} label='Contraseña' placeholder='**********' type='password' register={register} errors={errors.old_password} namebd='old_password' />
                <FormInput Icon={<RiLockPasswordLine />} label='Nueva Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' />
                <FormInput Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.password_confirm} namebd='password_confirm' />
            </Flex>
            <SaveChangesButton/>
            <RestarFormButton/>
        </form>
    )
}
