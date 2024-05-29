
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

import { ListRestart, LockKeyhole, MapPin, Rss, Save, User, } from 'lucide-react'
import { BsPencil, BsTwitterX } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import axios from 'axios';
import EditPersonalData from '../molecules/EditPersonalData';
import SaveChangesButton from '../atoms/buttons/SaveChangesButton';
import RestarFormButton from '../atoms/buttons/RestarFormButton';

export default function EditAddressData() {

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
        formData.append("cedula", data.cedula);
        formData.append("nationality", data.nationality);
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
        <form className={"mt-10"} onSubmit={onSubmit} encType="multipart/form-data">
            <Flex
                flexDirection={'row'}
                flexWrap={"wrap"}
                wrap={"wrap"}
                gap={{ base: 10, md: 10 }}
                mb={10}

            >
                <FormSelect Icon={<FaRegFlag />} label='País' table='countries' register={register} errors={errors.country} namebd='country' dependency={addressData ? addressData.country : null} setValues={setValue} />

                {country && (
                    <FormSelect Icon={<IoLocationOutline />} label='Estado' table='states' register={register} errors={errors.state} namebd='state' dependency={addressData ? addressData.country : null} setValues={setValue} />
                )}
                {state && (
                    <FormSelect Icon={<IoLocationOutline />} label='Ciudad' table='cities' register={register} errors={errors.city} namebd='city' dependency={addressData ? addressData.state : null} setValues={setValue} />

                )}
                {city && (

                    <FormSelect Icon={<IoLocationOutline />} label='Municipios' table='municipalities' register={register} errors={errors.municipality} namebd='municipality' dependency={addressData ? addressData.city : null} setValues={setValue} />

                )}
                {municipality && (

                    <FormSelect Icon={<IoLocationOutline />} label='Parroquia' table='parishes' register={register} errors={errors.parish} namebd='parish' dependency={addressData ? addressData.municipality : null} setValues={setValue} />
                )}
                {parish && (

                    <FormSelect Icon={<IoLocationOutline />} label='Codigo Postal' table='postalcodes' register={register} errors={errors.postalcode} namebd='postalcode' dependency={addressData ? addressData.parish : null} setValues={setValue} />
                )}

                <FormInput Icon={<IoLocationOutline />} label='Referencia' placeholder='' type='text' register={register} errors={errors.reference} namebd='reference' />
            </Flex>
            <SaveChangesButton/>
            <RestarFormButton/>
        </form>
    )
}
