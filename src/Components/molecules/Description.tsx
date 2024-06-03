import { AbsoluteCenter, AvatarBadge, Box, Button, Divider, IconButton, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { Edit2, Save } from 'lucide-react'
import React, { FormEvent, useEffect, useState } from 'react'
import DescriptionEdit from '../organisms/modals/DescriptionEdit'
import SaveChangesButton from '../atoms/buttons/SaveChangesButton'
import RestarFormButton from '../atoms/buttons/RestarFormButton'
import axios from 'axios'
import { obtainToken } from '@/helpers/Cookies'

/**
 * Componente para Mostrar la Descripción de los Usuarios
 */
interface UserDefinition {
    description: TrustedHTML
}

export default function Description({ userData, reload }: { userData: UserDefinition | null, reload: Function }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast(); //Notificaciones de feedback
    const [content, setContent] = useState<TrustedHTML | string>("")
    const [resetData, setResetData] = useState<boolean>(false);
    useEffect(() => {
        if (userData)
            setContent(userData.description)

    }, [userData, resetData]);
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!userData)
            return

        const token = await obtainToken();

        if (!token)
            return

        const updateData = { description: content }

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
                            description: "Tu Descripción ha sido Actualizada Correctamente",
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
    };

    return (
        <Box m={5}>
            <form onSubmit={(e) => onSubmit(e)}>
                <Box position='relative' padding='6'>
                    <Divider borderColor={'#171B27'} />
                    <AbsoluteCenter bg={"#EBEBD3"} px='4' >
                        <Text fontWeight={"semibold"} color={"#171B27"} fontSize={["md", "xl"]}> Mi Descripción</Text>
                    </AbsoluteCenter>
                </Box>

                <Box textAlign={'justify'} p={5} pr={10} fontWeight={"medium"} maxW={"100%"} color={"#212738"}>
                    {userData?.description && (
                        <>
                            &ldquo; <Text
                                wordBreak={"break-word"}
                                whiteSpace={"pre-wrap"}
                                overflowWrap={"break-word"}
                                maxWidth="100%"
                                overflow="hidden"
                                dangerouslySetInnerHTML={{ __html: content }}></Text>&rdquo;
                        </>
                    )}
                    {!userData?.description && (
                        <text>Sin Descripción</text>
                    )}
                    <Tooltip label='Editar Descripción' hasArrow placement='right' >
                        <Box
                            as={IconButton}
                            size="sm"
                            rounded="full"
                            top="-8px"
                            aria-label="change description"
                            icon={<Edit2 />}
                            bg={"transparent"}
                            onClick={onOpen}
                            _hover={
                                {

                                    color: "#1C7987"
                                }
                            }

                        />
                    </Tooltip>
                </Box>
                {content === "<p></p>" &&
                    <Text color={"red"} > La Descripción debe contener algun caracter  </Text>
                }
                {userData && userData.description != content && content !== "<p></p>" &&
                    <SaveChangesButton disabled={false} />
                }
                {userData && userData.description != content &&

                    <RestarFormButton restar={() => setResetData(!resetData)} />
                }
                <DescriptionEdit isOpen={isOpen} onClose={onClose} content={content} onChange={setContent} />
            </form>
        </Box>
    )
}
