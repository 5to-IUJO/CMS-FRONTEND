"use client"
import { takeScreenshot } from '@/helpers/screenshots'
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


/**
 * Modal para Previsualizar las web de los Usuarios
 */
export default function WebPreview({ isOpen, onClose, url, image, userData }: { isOpen: boolean, onClose: () => void, url: string , image:Function, userData:{url:string,urlImage:string} | null }) {
    const [preview, setPreview] = useState<string | any>();
    useEffect(() => {
        (async () => {
            if(url && url != userData?.url)
            {
                let {imageFile, imageUrl} : any = await takeScreenshot(url)
                setPreview(imageUrl)
                image("urlImage",imageFile)

            }
        })();

    }, [isOpen]);
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Previsualización de la WEB</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <Image src={preview ? preview : process.env.NEXT_PUBLIC_API_URL+"/"+userData?.urlImage} alt='web'></Image>

                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} variant='ghost' onClick={onClose}  >Volver</Button>


                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}
