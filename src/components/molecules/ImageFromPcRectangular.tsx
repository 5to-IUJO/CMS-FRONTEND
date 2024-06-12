"use client"
import { SmallCloseIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Button, Center, FormControl, FormLabel, IconButton, Input, Stack } from '@chakra-ui/react'
import { Image } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

interface FormInputProps {
    register: any,
    namebd: string,
    label:string,
    getValues: Function,
    setValue: Function,
    updateImage?:any,
}


/**
 * Componente para agregar una nueva imagen de perfil durante el registro
 */
export default function ImageFromPCRectangular({register, namebd,label, getValues, setValue, updateImage }: FormInputProps) {
    const [preview, setPreview] = useState(""); //useState para manejar la preview de la imagen
    
    useEffect(() => {
        if(!updateImage || preview !== "")
            return
        const file = updateImage[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    }, [updateImage]);

    const handleUploadedImage = (e: any) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const handleDeleteImage = () => {
        if (getValues(namebd)) {
            setValue(namebd,null)
            setPreview("");
        }
    };

    return (
        <FormControl >
            <Stack direction={['column', 'column']} spacing={6}>
                <Center>
                    <Avatar size="xl" src={preview} bg={"gray"}   borderRadius="5" w={"80%"}  h={"200px"} icon={<Image size='120'/>} >
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
                        bg={"cyan.400"}
                        colorScheme={"blue"}
                        textColor={"black.500"}
                        as={FormLabel}
                        cursor={"pointer"}
                        w="80%">
                        {preview != "" ? "Cambiar "+label : "Agregar "+label}
                    </Button  >
                    <Input
                     
                        type="file"
                        accept="image/*"
                        variant="outline"
                        hidden
                        {...register(namebd, {onChange:(e:Event) => {handleUploadedImage(e)} } )}
                    />
                </Center>
            </Stack>
        </FormControl>
    )
}
