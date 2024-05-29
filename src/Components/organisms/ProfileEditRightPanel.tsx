
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../atoms/FormInput'
import { FaInstagram, FaInternetExplorer, FaRegFlag, FaRegUser, FaTiktok } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import {  MdOutlineEmail } from "react-icons/md";
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
import EditAddressData from '../molecules/EditAddressData';
import EditSocialsNetworks from '../molecules/EditSocialsNetworks';
import EditSecurityData from '../molecules/EditSecurityData';



export default function ProfileEditRightPanel({userData}:{userData:{} | null}) {
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
        <Tabs isFitted variant="enclosed" borderColor={"black"} colorScheme="neon"  >
            <TabList mb="1em" fontFamily={"NeutraText-BoldItalic"} overflowX={"auto"} overflowY={"hidden"} >
                <Tab borderLeftRadius={"none"} _selected={{ color: "white", bg: "#1C7987" }} >
                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <User className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} p={0} m={0}>
                        Datos Personales
                    </Text>
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>
                    <Box mr={{ base: 2, md: 0, xl: 2 }}   >
                        <MapPin className=" w-4  md:w-8 xl:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Dirección

                    </Text>
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>

                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <Rss className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Redes Sociales

                    </Text>

                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>

                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <LockKeyhole className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Seguridad

                    </Text>

                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <EditPersonalData/>
                </TabPanel>
                <TabPanel>
                    <EditAddressData/>
                </TabPanel>
                <TabPanel>
                    <EditSocialsNetworks/>
                </TabPanel>
                <TabPanel>
                    <EditSecurityData/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
