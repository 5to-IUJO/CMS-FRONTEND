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
    useToast,
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


type FormInputs = {
    title: string
    blog_image: string
}

const validationsTitle = {
    required: { value: true, message: "Es Necesario Ingresar un Título" },
    maxLength: { value: 100, message: "El Título puede tener máximo 100 caracteres" },
    minLength: { value: 3, message: "El Título debe tener minimo 3 caracteres" }
}


export default function NewBlogStepTwo({ data, setStep }: { data: { title: string, blog_image: any } | undefined, setStep: Function }) {

    const { handleSubmit, register, formState: { errors }, getValues, setValue, watch,setError } = useForm<FormInputs>();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataInput, setDataIput] = useState([""]);
    const [sizeInput, setSizeInput] = useState(() => 1);
    const ref_input = useRef<HTMLInputElement>(null);
    const image = watch("blog_image")
    const toast = useToast(); //Notificaciones de feedback
    const router = useRouter();


    const onSubmit = handleSubmit(async data => {
        const token = await obtainToken();

        if (!token)
            return;

        const user = await obtainUserData();

        if (!user)
            return;

        if (!data.blog_image[0]) {
            setError("blog_image",{message:"Es Necesaria una Imagen Principal"})
            return;
        }

        setLoading(true)
        const formData = new FormData();
        if (data.blog_image[0])
            formData.append("blog_image", data.blog_image[0]);


        formData.append("title", data.title);
        formData.append("content", content);
        formData.append("user", user.data.id);

        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/newBlog", formData, { headers: { Authorization: "Token " + token.value } })
            .then(async (response) => {

                if (response.status === 201) {

                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Nuevo Blog',
                            description: "Tu Blog se ha Creado Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    router.push("/dashboard");
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
                if (!toast.isActive("data-update")) {
                    toast({
                        id: "data-update",
                        status: "error",
                        title: 'Nuevo Blog',
                        description: `Ha Ocurrido al Crear tu Blog, ${errorMessage ? errorMessage : ""}`,
                        position: "top",
                        duration: 5500,
                        isClosable: true,
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    })

    //UseEffect para colocar la imagen y el titulo ingresados anteriormente
    useEffect(() => {

        if (!data)
            return

        setValue("title", data.title)
        setValue("blog_image", data.blog_image)

    }, [data, setValue]);

    //UseEffect para manejar las Etiquetas Dinamicamente
    useEffect(() => {
        ref_input.current?.focus(); // auto focus input
        function handleKeyUp(event: any) {
            if (!ref_input.current)
                return;

            //Texto Escrito para la etiqueta
            const newText = ref_input.current.value.trim().replace(",", "");

            //Comprobacion de si se presionó la tecla , intro o Backspace. para ejecutar una accion
            switch (event.key) {
                case ",":
                    //Agregar Etiqueta al Array
                    if (newText.length > 0) {
                        const dataInputTemp = [...dataInput];
                        dataInputTemp.push(newText);
                        setDataIput(() => [...dataInputTemp]);
                        ref_input.current.value = "";
                    }
                    break;
                case "Enter":
                    //Agregar Etiqueta al Array
                    if (newText.length > 0) {
                        const dataInputTemp = [...dataInput];
                        dataInputTemp.push(newText);
                        setDataIput(() => [...dataInputTemp]);
                        ref_input.current.value = "";
                    }
                    break;
                case "Backspace":
                    //Eliminar Etiqueta del Array
                    if (dataInput.length > 0 && newText.length === 0) {
                        const dataInputTemp = [...dataInput];
                        dataInputTemp.pop();
                        setDataIput([...dataInputTemp]);
                    }
                    break;
                default:
                    break;
            }
        }
        //Se ejecuta cada vez que se suelta una letra en el form
        window.addEventListener("keyup", handleKeyUp);
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [sizeInput, dataInput]);


    //Funcion para manejar el cambio en el input de las etiquetas
    const handleChangeInput = (e: any) => {
        let value = e.target.value;
        if (value.trim().length > 0) {
            setSizeInput(value.length);
        } else if (ref_input.current) {
            ref_input.current.value = "";
        }
    };
    //Funcion que elimina del array dataInput el elemento seleccionado
    function handleDelItem(index: number) {
        const dataInputTemp = [...dataInput];
        dataInputTemp.splice(index, 1);
        setDataIput(() => [...dataInputTemp]);
    }

    return (
        <Flex h={"100%"} >
            <TextEditor
                content={content}
                onChange={(newContent: string) => setContent(newContent)}
            />
            <Flex w={"25%"} border='1px' borderColor='gray.700' bg={"darkBlue.400"}>
                <form >
                    <Flex flexDir={"column"} h={"91vh"} gap={2} color={"gray.300"} ml={2} w={"20vw"}>

                        <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"} color={"#F8F8F8"} fontFamily={"NeutraText-Bold"} mt={2}>Creación de Blogs</Text>
                        <FormInput Icon={<MdTitle />} label={"Título"} placeholder={"Tú Increible Títutlo de Blog"} type={"text"} register={register} errors={errors.title} namebd={'title'} />




                        <FormLabel fontSize={{ base: "lg", md: "xl" }} mt={12}>Imagen Principal</FormLabel>
                        <Box w={"15vw"}>
                            <ImageFromPCRectangular register={register} namebd={"blog_image"} label="Foto Principal" getValues={getValues} setValue={setValue} updateImage={image} />
                            {errors.blog_image?.message && image === null && (<Text color={"red"} > {errors.blog_image.message}  </Text>)}
                        </Box>

                        <FormLabel fontSize={{ base: "lg", md: "xl" }} >Etiquetas</FormLabel>
                        <Flex onClick={() => ref_input.current?.focus()} border={"1px"} borderColor={"gray.500"} p={2} mr={2} maxH={"120px"} overflowY={"scroll"} overflowX={"hidden"}>
                            <Box>
                                {dataInput.map((text, i) => (
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
                                    ref={ref_input}
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
