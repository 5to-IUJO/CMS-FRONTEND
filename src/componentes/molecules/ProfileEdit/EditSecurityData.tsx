"use client"
import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '@/componentes/atoms/inputs/FormInput'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SaveChangesButton from '@/componentes/atoms/buttons/SaveChangesButton'
import { obtainToken } from '@/helpers/Cookies'

export default function EditSecurityData({ reload }: { reload: Function }) {
    const { handleSubmit, register, setError, getValues, watch, setValue, setFocus,reset ,formState: { errors } } = useForm();
    const toast = useToast(); //Notificaciones de feedback
    const old_password = watch("old_password");
    const allData = watch();
    const [disable, setDisable] = useState<boolean>();
    const [modified, setModified] = useState<boolean>(false);

    useEffect(() => {
        if (allData.old_password && allData.password && allData.confirm_password)
            setModified(false)
        else
            setModified(true);
    }, [allData]);

    const onSubmit = handleSubmit(async data => {

        if (getValues("password") !== getValues("confirm_password")) {
            setError("confirm_password", { message: "Las Contraseñas no coinciden" });
            setFocus("confirm_password");
            return
        }

        const token = await obtainToken();

        if (!token)
            return


        //Hacer peticion al backend para actualizar los datos
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/change_password", data, { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    //Alerta de Modificacion Correcta
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Modificación de Perfil',
                            description: "Tu Contraseña ha sido Actualizada Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    reset();
                    reload();
                }
            })
            .catch((error) => {
                console.log(error);
                const errorResponse = JSON.parse(error.request.responseText);
                let errorMessage;
                // Verifica si el campo "responseText" existe
                if (errorResponse) {
                    // Acceder al mensaje de error 
                    errorMessage = errorResponse[Object.keys(errorResponse)[0]]

                    //Si sigue siendo un objeto, se vuelve a obtener el texto de la primer propiedad
                    if(typeof errorMessage === "object")
                        errorMessage = errorMessage[Object.keys(errorMessage)[0]]

                }

                //Alerta de Modificacion Incorrecta
                if (!toast.isActive("data-update")) {
                    toast({
                        id: "data-update",
                        status: "error",
                        title: 'Modificación de Perfil',
                        description: `Ha Ocurrido un Error Inesperado al Actualizar tus Datos, ${errorMessage ? errorMessage : ""}. Intente Nuevamente`,
                        position: "top",
                        duration: 5500,
                        isClosable: true,
                    })
                }
            })


    });

    useEffect(() => {
        if (old_password && old_password.length > 3 && old_password.length < 40) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }, [old_password, errors]);

    return (
        <form className={"mt-10"} onSubmit={onSubmit} encType="multipart/form-data">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontFamily={"NeutraText-Bold"} mb={4}>
                Cambio de Contraseña

            </Text>

            <Flex
                flexDirection={'column'}
                flexWrap={"wrap"}
                wrap={"wrap"}
                w={"300px"}
                gap={{ base: 10, md: 10 }}
                mb={10}

            >

                <FormInput Icon={<RiLockPasswordLine />} label='Contraseña Antigua' placeholder='**********' type='password' register={register} errors={errors.old_password} namebd='old_password' extraValidations={{ minLength: {value:8, message: "la contraseña tiene que tener minimo 8 caracteres"},  pattern:{value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , message:"La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />
                <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Nueva Contraseña' placeholder='**********' type='password' register={register} errors={errors.password} namebd='password' extraValidations={{ minLength: {value:8, message: "la contraseña tiene que tener minimo 8 caracteres"}, pattern:{value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , message:"La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />
                <FormInput disable={disable} Icon={<RiLockPasswordLine />} label='Confirme la Contraseña' placeholder='**********' type='password' register={register} errors={errors.confirm_password} namebd='confirm_password' extraValidations={{ minLength: {value:8, message: "la contraseña tiene que tener minimo 8 caracteres"},  pattern:{value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , message:"La Contraseña debe contener al menos 1 letra y 1 dígito" } }} />
            </Flex>
            <SaveChangesButton disabled={modified} />

        </form>
    )
}
