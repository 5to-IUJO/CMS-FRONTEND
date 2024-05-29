"use client"
import { obtainUserData } from '@/helpers/Users';
import { AbsoluteCenter, Avatar, AvatarBadge, Box, Button, Center, Divider, FormControl, FormLabel, IconButton, Input, Stack, Text, Tooltip } from '@chakra-ui/react'
import {Edit2, Save } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

interface UserDefinition {
    id: number,
    username: string,
    email: string,
    gender: number,
    date_of_birth: string,
    profile_image: string
}

interface FormInputProps {
    namebd: string,
    userData:UserDefinition | null,
}


/**
 * Componente para agregar cambiar / editar la imagen de perfil en el apartado de configuracion
 */
export default function ImageFromPCEditor({ namebd, userData }: FormInputProps) {
    const [preview, setPreview] = useState(""); //useState para manejar la preview de la imagen
    const [modify, setModify] = useState<boolean>(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null);


    const handleUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!modify)
            setModify(true);
        const file = e.target.files?.[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setPreview(urlImage);
        }
    };

    const triggerFileInput = () => {
        inputFileRef.current?.click();
    };

    const {register } = useForm();
    //referencia al input
    // @ts-ignore
    const { ref, ...rest } = register(namebd, { onChange: (e: Event) => { handleUploadedImage(e) } })


    return (
        <FormControl >

            <Box position='relative' padding='8'>
                <Divider borderColor={'#171B27'} />
                <AbsoluteCenter bg={"#EBEBD3"} px='4' >
                    <Text fontWeight={"semibold"} color={"#171B27"} fontSize={["md","xl"]}> Foto de Perfil</Text>
                </AbsoluteCenter>
            </Box>


            <Stack direction={['column', 'column']} spacing={6} mt={5}>
                <Center>
                    <Avatar size="2xl" src={preview ? preview : process.env.NEXT_PUBLIC_API_URL+""+userData?.profile_image} bg={"gray"} >
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
                    {modify &&
                        <Button
                            variant={'solid'}
                            bg={"#171B27"}
                            colorScheme={'blue'}
                            size={'sm'}
                            pl={[5, 3]}
                            w={"30%"}
                            m={2}
                            borderRadius={"sm"}
                            leftIcon={<Save />}>
                            Guardar Cambios

                        </Button>
                    }

                </Center>


            </Stack>

        </FormControl>
    )
}
