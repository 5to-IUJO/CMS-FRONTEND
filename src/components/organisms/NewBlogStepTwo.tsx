"use client"
import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    Input,
    Tag,
    TagCloseButton,
    Text,

} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { FaArrowRight } from 'react-icons/fa';
import ImageFromPCRectangular from '../molecules/ImageFromPcRectangular';
import { TextEditor } from './TextEditor';
import FormInput from '../atoms/inputs/FormInput';
import { MdTitle } from 'react-icons/md';
import { obtainToken } from '@/helpers/Cookies';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { obtainUserData } from '@/helpers/Users';
import { useBlogForm } from '@/Hooks/BlogForm';
import { useNotification } from '@/Hooks/Notification';


interface FormInputs {
    title: string;
    blog_image: FileList;
    tags: string[];
    content?: TrustedHTML | any;
}

export default function NewBlogStepTwo({ data }: { data: FormInputs | undefined }) {

    const { handleSubmit, register, formState: { errors }, getValues, setValue, watch, setError } = useForm<FormInputs>();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const refInput = useRef<HTMLInputElement>(null);
    const image = watch("blog_image")
    const { notification } = useNotification(); //Notificaciones de feedback
    const router = useRouter();

    //Custom Hook para manejar las tags y el cambio de content
    const { tags, sizeInput, handleChangeInput, handleDelItem, content, setContent } = useBlogForm(setValue, refInput, data);

    const onSubmit = handleSubmit(async data => {

        if (!data.blog_image) {
            setError("blog_image", { message: "Es Necesaria una Imagen Principal" })
            return;
        }

        if (content === "" || content === "<p></p>") {
            notification({ id: "blog-create", status: "error", title: "Crear Blog", description: `Ha Ocurrido al Crear tu Blog, Debe Existir Contenido dentro de tu Blog` })
            return;
        }

        const token = await obtainToken();

        if (!token)
            return;

        const user = await obtainUserData();

        if (!user)
            return;

        setLoading(true)
        const formData = new FormData();
        if (data.blog_image[0])
            formData.append("blog_image", data.blog_image[0]);

        formData.append("title", data.title);
        formData.append("content", content);
        formData.append("user", user.data.id);

        if (tags[0] === "")
            tags.shift()

        // Agregas cada tag al FormData como un campo con la misma clave 'tags'
        tags.forEach((tag: any) => {
            formData.append('tags', tag);
        });

        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/newBlog", formData, { headers: { Authorization: "Token " + token.value } })
            .then(async (response) => {

                if (response.status === 201) {
                    notification({ id: "blog-create", status: "success", title: "Nuevo Blog", description: "Se ha creado Correctamente tu Blog" })
                    router.push("/blogs");
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
                notification({ id: "blog-create", status: "error", title: "Nuevo Blog", description: `Ha Ocurrido al Crear tu Blog, ${errorMessage ? errorMessage : ""}` })

            })
            .finally(() => {
                setLoading(false)
            })
    })


    return (
        <Flex h={"100%"} mt={-5} >
            <TextEditor
                content={content}
                onChange={(newContent: string) => setContent(newContent)}
            />
            <Button
                onClick={() => setIsFormVisible(!isFormVisible)}
                display={{ base: "block" , lg: "none" }}
                position="absolute"
                bottom={isFormVisible ? 0 : 4}
                top={isFormVisible ? 2 : "auto"}
                right={isFormVisible ? 2 : 4}
                zIndex={1000}
            >
                {isFormVisible ? "X" : "Mostrar Formulario"}
                
            </Button>
            <Flex w={{ base: "100%", lg: "25%" }}
                display={{ base: !isFormVisible ? "none" : "flex", lg: "flex" }}
                position={{ base: isFormVisible ? "absolute" : "relative", lg: "relative" }}
                border='1px' borderColor='gray.700' bg={"darkBlue.400"}
                top={0}
                left={0}
                h={{base:"100%",lg:"93vh"}}
                zIndex={{base:isFormVisible ? 100 : "auto",md:"auto"} }
                >
                <form >
                    <Flex flexDir={"column"} h={{base:"100%"}} gap={2} color={"gray.300"} ml={2} w={{base:"100vw",lg:"20vw"}}  >

                        <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"} color={"#F8F8F8"} fontFamily={"NeutraText-Bold"} mt={2}>Creación de Blogs</Text>
                        <Box  maxW={{base:"80vw",lg:"15vw"}} overflow={"hidden"} >
                        <FormInput Icon={<MdTitle />} label={"Título"} placeholder={"Tú Increible Títutlo de Blog"} type={"text"} register={register} errors={errors.title} namebd={'title'} />
                        </Box>
                        <FormLabel fontSize={{ base: "lg", md: "xl" }} mt={12}>Imagen Principal</FormLabel>
                        <Box  w={{base:"80vw",lg:"20vw",xl:"15vw"}}>
                            <ImageFromPCRectangular register={register} namebd={"blog_image"} label="Foto Principal" getValues={getValues} setValue={setValue} updateImage={image} />
                            {errors.blog_image?.message && image === null && (<Text color={"red"} > {errors.blog_image.message}  </Text>)}
                        </Box>

                        <FormLabel fontSize={{ base: "lg", md: "xl" }} >Etiquetas</FormLabel>
                        <Flex onClick={() => refInput.current?.focus()} border={"1px"} borderColor={"gray.500"} p={2} mr={2}  maxH={"120px"} overflowY={"scroll"} overflowX={"hidden"}>
                            <Box>
                                {tags && tags.map((text: string, i: number) => (
                                    <Tag
                                        hidden={text === ""}
                                        key={i + "_" + text}
                                        colorScheme="cyan"
                                        m={2}
                                    >
                                        {text}
                                        <TagCloseButton onClick={() => handleDelItem(i)} />
                                    </Tag>
                                ))}
                                <input
                                    ref={refInput}
                                    onChange={handleChangeInput}
                                    className=' m-2 bg-[#1C243C] focus:outline-none w-full '
                                    size={sizeInput}
                                    maxLength={25}
                                />
                            </Box>
                        </Flex>
                        <Button rightIcon={<FaArrowRight />} isLoading={loading} className='buttonNeon' bgColor={'darkBlue.700'} w={"50%"} mx={"auto"} p={6} variant="solid" type='button' onClick={onSubmit} color={'white.400'} mt={12}>
                            Terminar
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}
