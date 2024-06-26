import FormInput from '@/components/atoms/inputs/FormInput'
import { TextEditorForm } from '@/components/organisms/TextEditorForm'

import { Box, Button, Flex, FormLabel, Spinner, Text } from '@chakra-ui/react'
import { TextIcon, Type } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageFromPCRectangular from '../ImageFromPcRectangular'
import SaveChangesButton from '@/components/atoms/buttons/SaveChangesButton'
import axios from 'axios'
import { urlToFileList } from '@/helpers/Images'
import { headers } from 'next/headers'
import { obtainToken } from '@/helpers/Cookies'
import { useNotification } from '@/Hooks/Notification'
import { useRouter } from 'next/navigation'

interface HomePage {
    banner: {
        title: string,
        button: string,
        description: string,
        background_image_url: string,
        image_url: string
    }

}
type FormInputs = {
    title: string
    blog_image: string
    background_image: FileList | false,
    image: FileList | false ,
    button:string,
}
export default function FormHomePageBanner({ setSelection }: { setSelection: (arg0: string | null) => void }) {
    const { register, formState: { errors }, getValues, watch, setValue, handleSubmit, setError } = useForm<FormInputs>()
    const background_image = watch("background_image")
    const image = watch("image")
    
    const { notification } = useNotification(); //Notificaciones de feedback
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    useEffect(() => {
        (async () => {
            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_homepage")
                .then(async (response) => {
                  
                    if (response.status === 200) {
                        setValue("title", response.data.banner.title);
                        setValue("button", response.data.banner.button);
                        setContent(response.data.banner.description);

                        const background_image = await urlToFileList(process.env.NEXT_PUBLIC_API_URL + "/" +(response.data.banner.background_image_url?.startsWith("staticsImages/") ? response.data.banner.background_image_url : "media/" +response.data.banner.background_image_url)  , 'imagen.jpg', 'image/jpeg')
                     
                     
                        setValue("background_image", background_image);

                        const image = await urlToFileList(process.env.NEXT_PUBLIC_API_URL + "/" +(response.data.banner.image_url?.startsWith("staticsImages/") ? response.data.banner.image_url : "media/" +response.data.banner.image_url), 'imagen.jpg', 'image/jpeg')
                        setValue("image", image);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener la información")
                })
        })();
    }, []);

    const onSubmit = handleSubmit(async (data: any) => {
       

        const token = await obtainToken();
        if (!token)
            return;

        if (!data.background_image) {
            setError("background_image", { message: "Es Necesaria una Imagen de Fondo" })
            return;
        }
        if (!data.image) {
            setError("image", { message: "Es Necesaria una Imagen de Banner" })
            return;
        }

        //* Se Guarda en un Form DATA para poder enviar las imagenes
        const formData = new FormData();
        formData.append("background_image", data.background_image[0]);
        formData.append("image", data.image[0]);

        formData.append("title", data.title);
        formData.append("description", content);
        formData.append("button", data.button);

        await axios.put(process.env.NEXT_PUBLIC_API_URL + "/update_homepage_banner", formData, { headers: { Authorization: "Token " + token.value } })
            .then(async (response) => {

                if (response.status === 200) {
                    notification({ id: "Homepage-edit", status: "success", title: "Editar Homepage", description: "Se ha Editado Correctamente tu Homepage" })
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
                notification({ id: "Homepage-edit", status: "error", title: "Editar Homepage", description: `Ha Ocurrido al Editar tu Homepage, ${errorMessage ? errorMessage : ""}` })

            })
            .finally(() => {
                setLoading(false)
            })
    })

    if (loading)
        return (
            <Spinner />
        )

    return (

        <form className='w-[50%] ' onSubmit={onSubmit}>

            <Flex p={5} ml={2} >
                <Flex w={"50%"} flexDir={"column"} gap={8}>
                    <FormInput Icon={<Type />} label={"Título del Banner"} placeholder={"Mi Titulo"} type='text' register={register} errors={errors.title} namebd={"title"} onFocus={() => setSelection("title")} />
                    <FormInput Icon={<Type />} label={"Texto del Boton"} placeholder={"Empezar"} type='text' register={register} errors={errors.button} namebd={"button"} onFocus={() => setSelection("button")} />
                    <Box>
                        <FormLabel fontSize={{ base: "lg", md: "xl" }} >Descripción </FormLabel>
                        <TextEditorForm
                            onChange={setContent}
                            content={content}
                            setSelection={setSelection}
                        />
                    </Box>

                </Flex>
                <Flex w={"50%"} flexDir={"column"} gap={3} >
                    <FormLabel fontSize={{ base: "lg", md: "xl" }}  >Modificar Imagen de Fondo</FormLabel>
                    <Box w={{ base: "80vw", md: "50vw", lg: "35vw", xl: "20vw" }} onMouseEnter={() => setSelection("background")}  >
                        <ImageFromPCRectangular register={register} namebd={"background_image"} label="Imagen de Fondo" getValues={getValues} setValue={setValue} updateImage={background_image} />
                    </Box>
                    {errors.background_image?.message && (<Text color={"red"} > {errors.background_image.message}  </Text>)}
                    <FormLabel fontSize={{ base: "lg", md: "xl" }} >Modificar Imagen del Banner</FormLabel>
                    <Box w={{ base: "80vw", md: "50vw", lg: "35vw", xl: "20vw" }} onMouseEnter={() => setSelection("bannerImage")} >
                        <ImageFromPCRectangular register={register} namebd={"image"} label="Imagen del Banner" getValues={getValues} setValue={setValue} updateImage={image} />
                        
                    </Box>
                    {errors.image?.message && (<Text color={"red"} > {errors.image.message}  </Text>)}

                   
                </Flex>



            </Flex>
            <Flex justifyContent={"center"} mt={5}>
                <SaveChangesButton disabled={false} />

            </Flex>

        </form>

    )
}
