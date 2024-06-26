import FormInput from '@/components/atoms/inputs/FormInput'
import { TextEditorForm } from '@/components/organisms/TextEditorForm'

import { Home, Info, Settings, Type, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
} from "@chakra-ui/react";
import axios from 'axios'
import { useNotification } from '@/Hooks/Notification'
import { obtainToken } from '@/helpers/Cookies'

const icons: any = {
    Home,
    User,
    Settings,
    Info,
};

type FormInputs = {
    title: string
    datacards: []
}

export default function FormHomePageDataCards({ setSelection }: { setSelection: (arg0: string | null) => void }) {
    const { register, formState: { errors }, getValues, setValue, handleSubmit, setError, clearErrors } = useForm<FormInputs>()

    const [dataCards, setDataCards] = useState<any>([]);
    const [currentText, setCurrentText] = useState("");
    const [currentIcon, setCurrentIcon] = useState("");

    const { notification } = useNotification(); //Notificaciones de feedback
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_homepage")
                .then(async (response) => {

                    if (response.status === 200) {
                        setValue("title", response.data.dataCards_title);
                        setDataCards(response.data.datacards);


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


        if (dataCards.length === 0) {
            setError("datacards", { message: "Es Necesario Tener al Menos una tarjeta de información" })
            return;
        }


        const requestData = {
            dataCards_title: data.title,
            datacards: dataCards
        };

        await axios.put(process.env.NEXT_PUBLIC_API_URL + "/update_homepage_datacards", requestData, { headers: { Authorization: "Token " + token.value } })
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


    const handleAddCard = () => {
        if (dataCards.length < 9 && currentText && currentIcon) {
            clearErrors("datacards")
            setDataCards([...dataCards, { title: currentText, icon: currentIcon }]);
            setCurrentText("");
            setCurrentIcon("");
        }
    };

    const handleRemoveCard = (index: number) => {
        const newCards = dataCards.filter((_: any, i: any) => i !== index);
        setDataCards(newCards);
    };

    if (loading)
        return (
            <Spinner />
        )

    return (

        <form className='w-[50%] ' onSubmit={onSubmit}>
            <Flex p={5} ml={2} >
                <Flex w={"100%"} flexDir={"column"} gap={8} alignItems={"center"}>
                    <FormInput Icon={<Type />} label={"Título del Banner"} placeholder={"Mi Titulo"} type='text' register={register} errors={errors.title} namebd={"title"} onFocus={() => setSelection("title")} />

                    <Box p={5} w={"70%"}>
                        <Text textAlign={"center"}>Agregar Tarjetas</Text>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Texto</FormLabel>
                                <Input
                                    _placeholder={{ color: 'gray.500' }}
                                    fontSize={{ base: "lg", md: "xl" }}
                                    borderColor={"cyan.400"}
                                    onFocus={() => setSelection("description")}
                                    value={currentText}
                                    onChange={(e) => setCurrentText(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Icono</FormLabel>
                                <Select
                                    borderColor={"cyan.400"}
                                    placeholder="Selecciona un ícono"
                                    value={currentIcon}
                                    onFocus={() => setSelection("icon")}
                                    onChange={(e) => setCurrentIcon(e.target.value)}
                                >
                                    {Object.keys(icons).map((key) => (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={handleAddCard} _hover={{ bg: "cyan.400" }} isDisabled={dataCards.length >= 9}>
                                Añadir Tarjeta
                            </Button>
                            {errors.datacards?.message && (<Text color={"red"} > {errors.datacards.message}  </Text>)}
                        </Stack>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={5}>
                            {dataCards.map((card: any, index: any) => (

                                <Box
                                    key={index}
                                    border="1px"
                                    borderRadius="md"
                                    borderColor={"cyan.400"}
                                    padding={4}
                                    textAlign="center"
                                    position="relative"
                                >

                                    <Icon
                                        aria-label={card.title}
                                        as={icons[card.icon]}
                                        isRound
                                        mb={2}
                                    />
                                    <Text>{card.title}</Text>
                                    <CloseButton
                                        position="absolute"
                                        top="5px"
                                        right="5px"
                                        onClick={() => handleRemoveCard(index)}
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                </Flex>



            </Flex>
            <Flex justifyContent={"center"} mt={5}>
                <SaveChangesButton disabled={false} />

            </Flex>

        </form>

    )
}
