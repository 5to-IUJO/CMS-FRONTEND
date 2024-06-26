
import { ReactNode } from 'react';
import {
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Text,
    useColorMode,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { FaArrowRight } from 'react-icons/fa';
import ImageFromPCRectangular from '../molecules/ImageFromPcRectangular';


type FormInputs = {
    title: string
    blog_image: string
}

const validationsTitle = {
    required: { value: true, message: "Es Necesario Ingresar un Título" },
    maxLength: { value: 100, message: "El Título puede tener máximo 100 caracteres" },
    minLength: { value: 3, message: "El Título debe tener minimo 3 caracteres" }
}


export default function NewBlogStepOne({ setData, setStep }: { setData: Function, setStep: Function }) {

    const { handleSubmit, register, formState: { errors }, getValues, setValue, setError } = useForm<FormInputs>();
    const theme = useColorMode();


    const onSubmit = handleSubmit(async data => {
        //Guardar la Data de la imagen y el titulo en el componente padre y cambiar al paso 2

        if (!data.blog_image[0]) {
            setError("blog_image", { message: "Es Necesaria una Imagen Principal" })
            return;
        }
        setData(data);
        setStep(2);
    })

    return (
        <form onSubmit={onSubmit} >
            <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} minH={"91vh"} gap={2} color={theme.colorMode === "light" ? "darkBlue.400" : "gray.300"} >

                <Text fontSize={{ base: "2xl", md: "3xl" }} color={theme.colorMode === "light" ? "darkBlue.400" : "#F8F8F8"}>¿Listo Para Contar Tu Historia?</Text>
                <FormLabel fontSize={{ base: "lg", md: "xl" }} mt={12}>¡Empecemos con el Título de tu Blog!</FormLabel>
                <Input
                    w={{base:"80%",md:"50%",lg:"35%",xl:"20%"}}
                    placeholder={"Tú Increible Título de Blog"}
                    type={"text"} variant={"flushed"}

                    textAlign={"center"}
                    _placeholder={{ color: 'gray.500' }}
                    fontSize={{ base: "lg", md: "xl" }}
                    borderColor={"#1F93A5"}
                    {...register("title", validationsTitle)}

                    _focusVisible={{ borderBottom: "2px solid #1F93A5" }}
                />

                {errors.title?.message && <Text color="red" >{errors.title.message}</Text>}
                <FormLabel fontSize={{ base: "lg", md: "xl" }} mt={12}>Y con una Imagen Principal</FormLabel>
                <Box w={{base:"80vw",md:"50vw",lg:"35vw",xl:"20vw"}}>

                    <ImageFromPCRectangular register={register} namebd={"blog_image"} label="Foto Principal" getValues={getValues} setValue={setValue} />
                </Box>


                {errors.blog_image?.message && (<Text color={"red"} > {errors.blog_image.message}  </Text>)}

                <Button rightIcon={<FaArrowRight />} className='buttonNeon' bgColor={'darkBlue.700'} p={6} variant="solid" type='submit' color={'white.400'} mt={12}>
                    Continuar
                </Button>
            </Flex>
        </form>
    )
}
