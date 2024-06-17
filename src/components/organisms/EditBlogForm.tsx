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
    id: number;
    title: string;
    blog_image: FileList;
    tags: string[];
    content?: TrustedHTML | any;
}

export default function EditBlogForm({ data }: { data: FormInputs }) {

    const { handleSubmit, register, formState: { errors }, getValues, setValue, watch, setError } = useForm<FormInputs>();
    const blogId = data.id
    const [loading, setLoading] = useState(false);
    const refInput = useRef<HTMLInputElement>(null);
    const image = watch("blog_image")
    const { notification } = useNotification(); //Notificaciones de feedback
    const router = useRouter();

    //Custom Hook para manejar las tags y el cambio de content
    const { tags, sizeInput, handleChangeInput, handleDelItem, content, setContent } = useBlogForm(setValue, refInput, data);

    const onSubmit = handleSubmit(async data => {
        const token = await obtainToken();

        if (!token)
            return;

        const user = await obtainUserData();

        if (!user)
            return;

        if (!data.blog_image[0]) {
            setError("blog_image", { message: "Es Necesaria una Imagen Principal" })
            return;
        }

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

        await axios.put(process.env.NEXT_PUBLIC_API_URL + "/blog/update/"+blogId+"/", formData, { headers: { Authorization: "Token " + token.value } })
            .then(async (response) => {

                if (response.status === 200) {
                    notification({ id: "blog-create", status: "success", title: "Editar Blog", description: "Se ha Editado Correctamente tu Blog" })
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
                notification({ id: "blog-create", status: "error", title: "Editar Blog", description: `Ha Ocurrido al Editar tu Blog, ${errorMessage ? errorMessage : ""}` })

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
            <Flex w={"25%"} border='1px' borderColor='gray.700' bg={"darkBlue.400"}>
                <form >
                    <Flex flexDir={"column"} h={"93vh"} gap={2} color={"gray.300"} ml={2} w={"20vw"}>

                        <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"} color={"#F8F8F8"} fontFamily={"NeutraText-Bold"} mt={2}>Creación de Blogs</Text>
                        <FormInput Icon={<MdTitle />} label={"Título"} placeholder={"Tú Increible Títutlo de Blog"} type={"text"} register={register} errors={errors.title} namebd={'title'}  extraValidations={{ minLength: { value: 3, message: "El Título debe tener minimo 3 caracteres" }}}/>




                        <FormLabel fontSize={{ base: "lg", md: "xl" }} mt={12}>Imagen Principal</FormLabel>
                        <Box w={"15vw"}>
                            <ImageFromPCRectangular register={register} namebd={"blog_image"} label="Foto Principal" getValues={getValues} setValue={setValue} updateImage={image} />
                            {errors.blog_image?.message && image === null && (<Text color={"red"} > {errors.blog_image.message}  </Text>)}
                        </Box>

                        <FormLabel fontSize={{ base: "lg", md: "xl" }} >Etiquetas</FormLabel>
                        <Flex onClick={() => refInput.current?.focus()} border={"1px"} borderColor={"gray.500"} p={2} mr={2} maxH={"120px"} overflowY={"scroll"} overflowX={"hidden"}>
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
                                    className=' m-2 bg-[#1C243C] focus:outline-none '
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
