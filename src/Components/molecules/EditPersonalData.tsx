

import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../atoms/FormInput'
import { FaInstagram, FaInternetExplorer, FaRegFlag, FaRegUser, FaTiktok } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '../atoms/FormRadioInput';
import { useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';;
import FormCedula from '../atoms/FormCedula'
import FormSelect from '../atoms/FormSelect'

import { Flag, ListRestart, LockKeyhole, MapPin, Rss, Save, User, } from 'lucide-react'
import { BsPencil, BsTwitterX } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import axios from 'axios';
import SaveChangesButton from '../atoms/buttons/SaveChangesButton';
import RestarFormButton from '../atoms/buttons/RestarFormButton';
import FormSelectNationalities from '../atoms/FormSelectNationalities';
export default function EditPersonalData() {
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
                <FormInput Icon={<BsPencil />} label='Primer Nombre' placeholder='José' type='text' register={register} errors={errors.name} namebd='name' />
                <FormInput Icon={<BsPencil />} label='Segundo Nombre' placeholder='Miguel' type='text' register={register} errors={errors.second_name} namebd='second_name' extraValidations={{ required: false }} />
                <FormInput Icon={<BsPencil />} label='Apellido' placeholder='Díaz' type='text' register={register} errors={errors.lastname} namebd='lastname' />
                <FormInput Icon={<BsPencil />} label='Segundo Apellido' placeholder='Cruz' type='text' register={register} errors={errors.second_lastname} namebd='second_lastname' extraValidations={{ required: false }} />
                <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />

                <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />
                <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' />


                <FormCedula register={register} errors={errors.cedula} errors2={errors.types} />
                <FormSelectNationalities Icon={<Flag />} label='Nacionalidad' table='countries_nationality' register={register} errors={errors.countries_nationality} namebd='countries_nationality'  setValues={setValue} />
                <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={getValues("gender")} />
            </Flex>

            <SaveChangesButton/>
            <RestarFormButton/>
        </form>
    )
}
