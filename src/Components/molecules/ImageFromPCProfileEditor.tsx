"use client"
import { obtainUserData } from '@/helpers/Users';
import { AbsoluteCenter, Avatar, AvatarBadge, Box, Button, Center, Divider, FormControl, FormLabel, IconButton, Input, Stack, Text, Tooltip, useToast } from '@chakra-ui/react'
import { Edit2, Save } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import SaveChangesButton from '../atoms/buttons/SaveChangesButton';
import RestarFormButton from '../atoms/buttons/RestarFormButton';
import axios from 'axios';
import { obtainToken } from '@/helpers/Cookies';

interface UserDefinition {
    profile_image: string
}

interface FormInputProps {
    namebd: string,
    userData: UserDefinition | null,
    reload: Function
}


/**
 * Componente para agregar cambiar / editar la imagen de perfil en el apartado de configuracion
 */
export default function ImageFromPCEditor({ namebd, userData, reload }: FormInputProps) {

    const { handleSubmit, register, setError, getValues, watch, setValue, setFocus, resetField, formState: { errors } } = useForm();
    const toast = useToast(); //Notificaciones de feedback

    const [preview, setPreview] = useState(""); //useState para manejar la preview de la imagen
    const [resetData, setResetData] = useState<boolean>(false);//useState para resetear la data a la original
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (userData)
            setPreview(process.env.NEXT_PUBLIC_API_URL + "" + userData?.profile_image)
    }, [userData, resetData]);

    const handleUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setValue("profile_image", e.target.files?.[0])
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setPreview(urlImage);
        }
    };

    const triggerFileInput = () => {
        inputFileRef.current?.click();
    };


    //referencia al input
    const { ref, ...rest } = register(namebd, { onChange: (e: any) => { handleUploadedImage(e) } })

    const onSubmit = handleSubmit(async data => {

        if (!userData)
            return

        const token = await obtainToken();

        if (!token)
            return
        //* Se Guarda en un Form DATA para poder lae  de perfil del usuario
        const updateData = new FormData();

        if (data.profile_image)
            updateData.append("profile_image", data.profile_image);


        //Hacer peticion al backend para actualizar los datos
        await axios.patch(process.env.NEXT_PUBLIC_API_URL + "/update_profile", updateData, { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    //Alerta de Modificacion Correcta
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Modificación de Perfil',
                            description: "Tu Foto ha sido Actualizada Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    reload();
                }
            })
            .catch((error) => {

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
        <FormControl >
            <form onSubmit={onSubmit} encType="multipart/form-data">


                <Box position='relative' padding='8'>
                    <Divider borderColor={'#171B27'} />
                    <AbsoluteCenter bg={"#EBEBD3"} px='4' >
                        <Text fontWeight={"semibold"} color={"#171B27"} fontSize={["md", "xl"]}> Foto de Perfil</Text>
                    </AbsoluteCenter>
                </Box>


                <Stack direction={['column', 'column']} spacing={6} mt={5}>
                    <Center>
                        <Avatar size="2xl" src={preview} bg={"gray"} >
                            <Tooltip label='Cambiar Foto' hasArrow placement='right' >
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    aria-label="change Image"
                                    icon={<Edit2 />}
                                    onClick={triggerFileInput}

                                />
                            </Tooltip>
                        </Avatar>
                    </Center>
                    <Center w="full">
                        <Input
                            type="file"
                            accept="image/*"
                            variant="outline"
                            hidden
                            {...rest} ref={inputFileRef}

                        />
                        {userData && process.env.NEXT_PUBLIC_API_URL + "" + userData?.profile_image !== preview &&
                            <>
                                <SaveChangesButton disabled={false} />
                                <RestarFormButton restar={() => setResetData(!resetData)} />
                            </>
                        }

                    </Center>


                </Stack>
            </form>
        </FormControl>
    )
}
