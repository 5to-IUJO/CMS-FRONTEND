import ImageFromPC from '@/componentes/molecules/ImageFromPC'
import { obtainToken } from '@/helpers/Cookies';
import { urlToFileList } from '@/helpers/Images';
import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


/**
 * Modal para Agregar Imagenes a los blogs
 */
export default function AddImage({ isOpen, onClose, setImage }: { isOpen: boolean, onClose: () => void, setImage: Function }) {
    const { handleSubmit, getValues, watch, register, reset, setValue, formState: { errors } } = useForm();

    const [activeTab, setActiveTab] = useState<number>(0);

    const [disable, setDisable] = useState<boolean>(true);

    // Observa los valores del formulario
    const values = watch();

    //UseEffect encargado de Activar o Desactivar el boton submit
    useEffect(() => {
        if (activeTab === 0 && getValues("image")?.length > 0)
            setDisable(false);
        else if (activeTab === 1 && getValues("imageURL"))
            setDisable(false);
        else
            setDisable(true);
    }, [activeTab, [values]]);


    //UseEffect para resetear el Formulario cada vez que se cierra la modal
    useEffect(() => {
        if (!isOpen)
            reset();
    }, [isOpen, reset]);

    const onSubmit = async () => {
        const formData = new FormData();
        //Metodo archivo local
        if (activeTab === 0) {
            formData.append("image", getValues("image")[0]);
        }

        //metodo URL
        else if (activeTab === 1) {

            const image: any = await urlToFileList(getValues("imageURL"), 'imagen.jpg', 'image/jpeg');
            if(!image)
            {
                alert("URL Incorrecta");
                return;
            }
            formData.append("image", image[0]);
        }

        const token = await obtainToken();
    
        //Se guarda la imagen en el backend/bd
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/upload_image", formData, { headers: { Authorization: "Token " + token?.value } }
        ).then(response => {
            if (response.status === 201) {
                setImage(response.data.url);
                onClose();
            }
        }).catch(error => {
            console.log(error);
            alert("Error al Subir la imagen");
        })

    };


    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={useColorModeValue("white.500","black.300")}>
                    <ModalHeader textAlign={"center"}>Nueva Imagen</ModalHeader>
                    <ModalCloseButton />
                    <form >
                        <ModalBody>
                            <Tabs isFitted variant='enclosed' onChange={(index) => setActiveTab(index)}>
                                <TabList mb='1em'>
                                    <Tab>Subir Archivo</Tab>
                                    <Tab>Usar URL</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <ImageFromPC register={register} namebd={"image"} label='Imagen' getValues={getValues} setValue={setValue} />
                                    </TabPanel>
                                    <TabPanel>
                                        <FormLabel>URL de la Imagen</FormLabel>
                                        <Input
                                            type="url"
                                            variant="outline"
                                            {...register("imageURL", { required: { value: true, message: "Necesita Agregra una URL" }, })}
                                        />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} variant='ghost' onClick={onClose}  >Cancelar</Button>
                            <Button colorScheme='blue' isDisabled={disable} type='button' onClick={onSubmit}>
                                Subir Imagen
                            </Button>

                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
