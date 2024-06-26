import FormInput from '@/components/atoms/inputs/FormInput'
import { TextEditorForm } from '@/components/organisms/TextEditorForm'

import { Home, Info, Settings, Type, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import ImageFromPCRectangular from '../ImageFromPcRectangular'
import SaveChangesButton from '@/components/atoms/buttons/SaveChangesButton'
import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    SimpleGrid,
    Stack,
    Text,
    Select,
    Icon,
    Spinner,
    CloseButton,
    Heading,
    Image,
} from "@chakra-ui/react";
import axios from 'axios'
import { useNotification } from '@/Hooks/Notification'
import { obtainToken } from '@/helpers/Cookies'
import { copyFileList, fileListToURL, urlToFileList } from '@/helpers/Images'


type FormInputs = {
    minibanner: { title: string; description: string; image: FileList | null; align: string; color: string }[];
}

export default function FormAboutUsMiniBanners({ setSelection }: { setSelection: (arg0: string | null) => void }) {
    const { register, formState: { errors }, getValues, setValue, handleSubmit, setError, clearErrors, resetField, watch } = useForm<{ image: FileList | null, minibanner: string }>()

    const [minibanners, setMiniBanners] = useState<FormInputs['minibanner']>([]);
    const [currentText, setCurrentText] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentImage, setCurrentImage] = useState<File | FileList | null>(null);
    const [currentAlignment, setCurrentAlignment] = useState("");
    const [currentColor, setCurrentColor] = useState("");

    const image = watch("image")
    const { notification } = useNotification(); //Notificaciones de feedback
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_aboutus")
                .then(async (response) => {

                    if (response.status === 200) {
                        let minibanners = response.data.minibanners;

                        // map para crear una lista de promesas
                        const minibannersWithFiles = await Promise.all(
                            minibanners.map(async (banner: any) => {
                                const fileList = await urlToFileList(`${process.env.NEXT_PUBLIC_API_URL}/${banner.image_url?.startsWith("staticsImages/") ? banner.image_url : "media/" + banner.image_url}`, 'imagen.jpg', 'image/jpeg');
                                return { ...banner, image: fileList };
                            })
                        );

                        setMiniBanners(minibannersWithFiles);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener la información")
                })
        })();
    }, []);

    const onSubmit = handleSubmit(async (data) => {


        const token = await obtainToken();
        if (!token)
            return;



        if (minibanners.length === 0) {
            setError("minibanner", { message: "Es Necesario Tener al Menos un MiniBanner" });
            return;
        }

        const formData = new FormData();

        // Agregar minibanners como JSON string
        formData.append("minibanners", JSON.stringify(minibanners.map((banner, index) => ({
            ...banner,
            image: null // No agregar image aquí, se manejará después
        }))));
    
        // Agregar archivos de imagen individualmente
        minibanners.forEach((banner, index) => {
            if (banner.image) {
                formData.append(`image_${index}`, banner.image[0]); // Acceder al primer archivo en FileList
            }
        });

        await axios.put(process.env.NEXT_PUBLIC_API_URL + "/update_aboutus_minibanners", formData, { headers: {'Content-Type': 'multipart/form-data', Authorization: "Token " + token.value } })
            .then(async (response) => {

                if (response.status === 200) {
                    notification({ id: "AboutUs-edit", status: "success", title: "Editar AboutUs", description: "Se ha Editado Correctamente tu AboutUs" })
                }
            }).catch((error) => {

                console.log(error);
                const errorResponse = JSON.parse(error.request.responseText);

                let errorMessage;
                // Verifica si el campo "responseText" existe
                if (errorResponse) {
                    // Acceder al mensaje de error 
                    errorMessage = errorResponse[Object.keys(errorResponse)[0]]

                    //Si sigue siendo un objeto, se vuelve a obtener el texto de la primer propiedad
                    if (typeof errorMessage === "object")
                        errorMessage = errorMessage[Object.keys(errorMessage)[0]]

                }

                //Alerta de Modificacion Incorrecta
                notification({ id: "AboutUs-edit", status: "error", title: "Editar AboutUs", description: `Ha Ocurrido al Editar tu AboutUs, ${errorMessage ? errorMessage : ""}` })

            })
            .finally(() => {
                setLoading(false)
            })
    })



    const handleAddCard = () => {
        const fileList = getValues("image"); // Obtener la imagen

        if (!fileList) {
            setError("image", {
                type: "manual",
                message: "Debe seleccionar una imagen"
            });
            return
        }

        const image = copyFileList(fileList);

        if (minibanners.length < 4 && currentText && currentDescription && currentAlignment && currentColor) {
            clearErrors("minibanner");


            setMiniBanners([...minibanners, {
                title: currentText,
                description: currentDescription,
                image: image,
                align: currentAlignment,
                color: currentColor
            }]);

            setCurrentText("");
            setCurrentDescription("");
            setCurrentImage(null);
            setCurrentAlignment("");
            setCurrentColor("");

            // Limpia el campo de entrada sin afectar el estado de minibanners

            resetField("image")

        }
    };



    const handleRemoveCard = (index: number) => {
        const newCards = minibanners.filter((_: any, i: any) => i !== index);
        setMiniBanners(newCards);
    };

    if (loading)
        return (
            <Spinner />
        )


    return (

        <form className='w-[50%] ' onSubmit={onSubmit}>
            <Flex p={5} ml={2} >
                <Flex w={"100%"} flexDir={"column"} gap={8} alignItems={"center"}>
                    <Box p={5} w={"70%"}>
                        <Text textAlign={"center"}>Agregar Mini Banner</Text>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Titulo</FormLabel>
                                <Input
                                    _placeholder={{ color: 'gray.500' }}
                                    fontSize={{ base: "lg", md: "xl" }}
                                    borderColor={"cyan.400"}
                                    value={currentText}
                                    onFocus={() => setSelection("title")}
                                    onChange={(e) => setCurrentText(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Descripción</FormLabel>
                                <Input
                                    _placeholder={{ color: 'gray.500' }}
                                    fontSize={{ base: "lg", md: "xl" }}
                                    borderColor={"cyan.400"}
                                    value={currentDescription}
                                    onFocus={() => setSelection("description")}
                                    onChange={(e) => setCurrentDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Alineación</FormLabel>
                                <Select
                                    borderColor={"cyan.400"}
                                    placeholder="Selecciona una alineación"
                                    value={currentAlignment}
                                    onFocus={() => setSelection("align")}
                                    onChange={(e) => setCurrentAlignment(e.target.value)}
                                >
                                    <option value="left">Izquierda</option>
                                    <option value="right">Derecha</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Color</FormLabel>
                                <Select
                                    borderColor={"cyan.400"}
                                    placeholder="Seleccione un Color"
                                    value={currentColor}
                                    onFocus={() => setSelection("color")}
                                    onChange={(e) => setCurrentColor(e.target.value)}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Imagen</FormLabel>
                                <Box w={{ base: "80vw", md: "50vw", lg: "35vw", xl: "20vw" }} onMouseEnter={() => setSelection("image")} >
                                    <ImageFromPCRectangular register={register} namebd={"image"} label="Imagen del Mini Banner" getValues={getValues} setValue={setValue} updateImage={image} />

                                </Box>

                            </FormControl>
                            {errors.image?.message && (<Text color={"red"} > {errors.image.message}  </Text>)}
                            <Button onClick={handleAddCard} _hover={{ bg: "cyan.400" }} isDisabled={minibanners.length >= 4}>
                                Añadir Mini Banner
                            </Button>

                        </Stack>

                        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mt={5}>
                            {minibanners.map((card: any, index: any) => (

                                <Flex
                                    key={index}
                                    border="1px"
                                    borderRadius="md"
                                    borderColor={"cyan.400"}
                                    padding={4}
                                    textAlign="center"
                                    position="relative"
                                    flexDirection={{ base: 'column', md: card.align === "left" ? 'row' : 'row-reverse' }}
                                    p={5}
                                    pt={8}
                                    gap={4}
                                    alignItems={"center"}

                                    bg={card.color === 'light' ? 'white.500' : 'darkBlue.700'}
                                >

                                    <Flex w='70%' flexDirection={'column'} gap={4} justifyContent={'center'} alignItems={'center'} color={card.color === 'light' ? 'black.400' : 'white.500'}>
                                        <Heading fontSize={'24px'} fontFamily={'NeutraText-BoldItalic'} textAlign={{ base: 'center', lg: 'start' }} className={card.color === 'light' ? '' : 'textGlow'}>
                                            {card.title}
                                        </Heading>
                                        <Text maxW='500px' fontSize={'22px'} textAlign={{ base: 'center', lg: 'start' }} dangerouslySetInnerHTML={{ __html: card.description }}></Text>
                                    </Flex>

                                    <Flex as="section" w={'30%'} justifyContent={'center'} alignItems={'center'}>
                                        <Image w={{ base: '150px' }} src={fileListToURL(card.image)} alt='icon' />
                                    </Flex>
                                    <CloseButton
                                        position="absolute"
                                        top="5px"
                                        right="5px"
                                        onClick={() => handleRemoveCard(index)}
                                        color={card.color === 'light' ? 'black.400' : 'white.500'}
                                    />
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Box>

                </Flex>



            </Flex>
            <Flex justifyContent={"center"} m={5}>
                <SaveChangesButton disabled={false} />

            </Flex>

        </form>

    )
}
