"use client"
import { SmallCloseIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Button, Center, FormControl, FormLabel, GenericAvatarIcon, IconButton, Input, Stack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

interface FormInputProps {
    register: (placeholder:string, {})=>{},
    errors: any,
    namebd: string
}

export default function FormUserIcon({register, errors, namebd }: FormInputProps) {

    const [preview, setPreview] = useState(""); //useState para manejar la preview de la imagen
    const fileInputRef: any = useRef<HTMLInputElement>(null);

    const handleUploadedImage = (e: any) => {
     
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const handleDeleteImage = () => {
        if(fileInputRef.current.value )
        {
            fileInputRef.current.value = null;
            setPreview("");
        }
    };

    return (
        <FormControl >
            <FormLabel>Foto de Perfil</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                    <Avatar size="xl" src={preview } bg={"gray"} >
                        <AvatarBadge
                            as={IconButton}
                            size="sm"
                            rounded="full"
                            top="-10px"
                            colorScheme="red"
                            aria-label="remove Image"
                            icon={<SmallCloseIcon />}
                            onClick={handleDeleteImage}
                            hidden={preview ? false : true}
                        />
                    </Avatar>
                </Center>
                <Center w="full">

                    <Button 
                        as={FormLabel}
                        w="full">
                        {preview != "" ? "Cambiar Avatar" : "Seleccione un Avatar"}
                    </Button  >
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        variant="outline"
                        hidden
                        {...register(namebd,{required: false, onChange:(e:Event) => {handleUploadedImage(e)} })}
                        />
                </Center>
            </Stack>
        </FormControl>
    )
}
