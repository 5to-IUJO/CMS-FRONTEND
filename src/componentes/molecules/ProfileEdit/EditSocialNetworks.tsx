"use client"
import { Box, Button, Flex, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '@/componentes/atoms/inputs/FormInput'
import { FaFacebook, FaInstagram, FaInternetExplorer, FaTiktok } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SaveChangesButton from '@/componentes/atoms/buttons/SaveChangesButton'
import RestarFormButton from '@/componentes/atoms/buttons/RestarFormButton'
import { EyeIcon } from 'lucide-react'
import WebPreview from '@/componentes/organisms/modals/WebPreview'
import { equalsObjects, obtainValuesModified } from '@/helpers/Utilities'
import { obtainToken } from '@/helpers/Cookies'
import { UserDefinition } from '@/interfaces/UserDefinition'


export default function EditSocialsNetworks({ userData, reload }: { userData: UserDefinition | null, reload: Function }) {
    const { handleSubmit, register, getValues, watch, setValue, formState: { errors } } = useForm();
    register("urlImage");

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast(); //Notificaciones de feedback
    const [modified, setModified] = useState<boolean>(false);
    const [resetData, setResetData] = useState<boolean>(false);
    const allData = watch();

    //UseEffect que rellenar el form con los datos del usuario
    useEffect(() => {

        if (!userData)
            return;

        setValue("instagram", userData.instagram);
        setValue("facebook", userData.facebook);
        setValue("x", userData.x);
        setValue("tiktok", userData.tiktok);
        setValue("url", userData.url);
        setValue("urlImage", userData.urlImage);


    }, [userData, setValue, resetData]);

    //UseEffect para cambiar el estado del boton de guardar cambios, entre desahabilitado y habilitado
    useEffect(() => {

        if (!userData)
            return
        setModified(equalsObjects(userData, allData))

    }, [userData, allData]);

    const onSubmit = handleSubmit(async data => {

        if (!userData)
            return

        const token = await obtainToken();

        if (!token)
            return

        

        //Obtener Campos que han sido actualizados
        const updateData = obtainValuesModified(userData, data)

        
        const formData = new FormData();

        // Añadir los campos del updateData al FormData
        for (const key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                formData.append(key, updateData[key]);
            }
        }
        
        //Hacer peticion al backend para actualizar los datos
        await axios.patch(process.env.NEXT_PUBLIC_API_URL + "/update_profile", formData, { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    //Alerta de Modificacion Correcta
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Modificación de Perfil',
                            description: "Tus Datos De Redes Sociales han sido Actualizados Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    reload();
                }
            })
            .catch((error) => {
                console.log(error);
                const errorResponse = JSON.parse(error.request.responseText);
                let errorMessage;
                // Verifica si el campo "responseText" existe
                if (errorResponse) {
                    // Acceder al mensaje de error 
                    errorMessage = errorResponse[Object.keys(errorResponse)[0]]

                }

                //Alerta de Modificacion Incorrecta
                if (!toast.isActive("data-update")) {
                    toast({
                        id: "data-update",
                        status: "error",
                        title: 'Modificación de Perfil',
                        description: `Ha Ocurrido un Error Inesperado al Actualizar tus Datos, ${errorMessage ? errorMessage : ""} Intente Nuevamente`,
                        position: "top",
                        duration: 5500,
                        isClosable: true,
                    })
                }
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
                <FormInput Icon={<FaFacebook />} label='Facebook' placeholder='usuario' type='text' register={register} errors={errors.facebook} namebd='facebook' extraValidations={{minLength: { value: 5, message: "El Facebook tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<FaInstagram />} label='Instagram' placeholder='@usuario' type='text' register={register} errors={errors.instagram} namebd='instagram' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Instragram tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<BsTwitterX />} label='X' placeholder='@usuario' type='text' register={register} errors={errors.x} namebd='x' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El usuario de X tiene que tener minimo 2 caracteres" }, required: false }} />
                <FormInput Icon={<FaTiktok />} label='TikTok' placeholder='@usuario' type='text' register={register} errors={errors.tiktok} namebd='tiktok' extraValidations={{ pattern: { value: /^@([a-zA-Z0-9_]+)$/, message: "El nombre de usuario debe comenzar con @" }, minLength: { value: 2, message: "El Tiktok tiene que tener minimo 2 caracteres" }, required: false }} />
                <Flex>
                    <FormInput Icon={<FaInternetExplorer />} label='Página WEB' placeholder='https://mipaginaweb.com' type='url' register={register} errors={errors.url} namebd='url' extraValidations={{ pattern: { value: /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/, message: "Es Obligatorio que la url sea HTTPS:// y que tenga al menos 1 caracter despues del //" }, minLength: { value: 9, message: "URL Invalida" }, required: false }} />
                    <Box alignContent={"center"} justifyContent={"center"} mt={8}>
                        <Tooltip label="Vista Previa de la Página WEB">
                            <Button variant={"unstyled"} onClick={onOpen} _hover={{ textColor: "#1C7987" }} >
                                <EyeIcon />

                            </Button>

                        </Tooltip>
                    </Box>
                </Flex>

            </Flex>
            <WebPreview isOpen={isOpen} onClose={onClose} url={getValues("url")} image={setValue} userData={userData} />
            <SaveChangesButton disabled={modified} />
            <RestarFormButton restar={() => setResetData(!resetData)} />
        </form>
    )
}
