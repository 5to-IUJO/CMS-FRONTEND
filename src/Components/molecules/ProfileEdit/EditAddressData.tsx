
import { Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '../../atoms/inputs/FormInput'
import { FaRegFlag } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import FormSelect from '../../atoms/inputs/FormSelect'

import { IoLocationOutline } from 'react-icons/io5'
import axios from 'axios';
import SaveChangesButton from '../../atoms/buttons/SaveChangesButton';
import RestarFormButton from '../../atoms/buttons/RestarFormButton';
import { equalsObjects, obtainValuesModified } from '@/helpers/Utilities';
import { obtainToken } from '@/helpers/Cookies';
import { UserDefinition } from '@/interfaces/UserDefinition';


export default function EditAddressData({ userData, reload }: { userData: UserDefinition | null, reload: Function }) {

    const { handleSubmit, register, setError, getValues, watch, setValue, setFocus, resetField, formState: { errors } } = useForm();
    const toast = useToast(); //Notificaciones de feedback
    const [modified, setModified] = useState<boolean>(false);
    const [resetData, setResetData] = useState<boolean>(false);
    const allData = watch();
    //UseEffect que rellenar el form con los datos del usuario
    useEffect(() => {

        if (!userData)
            return;

        setValue("country", userData.address?.country);
        setValue("state", userData.address?.state);
        setValue("city", userData.address?.city);
        setValue("municipality", userData.address?.municipality);
        setValue("parish", userData.address?.parish);
        setValue("reference", userData.address?.reference);


    }, [userData, setValue, resetData]);


    //UseEffect para cambiar el estado del boton de guardar cambios, entre desahabilitado y habilitado
    useEffect(() => {

        if (!userData)
            return
        setModified(equalsObjects(userData.address, allData))

    }, [userData, allData]);

    //Al cambiar los datos en un select, resetea los campos del formulario pertienentes
    const handleSelectChange = (selectName: string) => {

        if (selectName === "countries") {
            resetField('state');
            resetField('city');
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "states") {
            resetField('city');
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "cities") {
            resetField('municipality');
            resetField('parish');
        }
        else if (selectName === "municipality") {
            resetField('parish');
        }

    }

    const onSubmit = handleSubmit(async data => {

        if (!userData)
            return

        const token = await obtainToken();

        if (!token)
            return


        //Obtener Campos que han sido actualizados
        const updateData = { address: obtainValuesModified(userData.address, data) }

        //Hacer peticion al backend para actualizar los datos
        await axios.patch(process.env.NEXT_PUBLIC_API_URL + "/update_profile", updateData, { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    //Alerta de Modificacion Correcta
                    if (!toast.isActive("data-update")) {
                        toast({
                            id: "data-update",
                            status: "success",
                            title: 'Modificación de Perfil',
                            description: "Tus Datos De Dirección han sido Actualizados Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    reload();
                }
            })
            .catch((error) => {

                const errorResponse = JSON.parse(error.request.responseText);
                let errorMessage;
                // Verifica si el campo "responseText" existe
                if (errorResponse) {
                    // Acceder al mensaje de error 
                    errorMessage = errorResponse[Object.keys(errorResponse)[0]]

                }

                //Alerta de Modificacion Incorrecta
                if (!toast.isActive("data-update")) {
                    toast({
                        id: "data-update",
                        status: "error",
                        title: 'Modificación de Perfil',
                        description: `Ha Ocurrido un Error Inesperado al Actualizar tus Datos, ${errorMessage ? errorMessage : ""} Intente Nuevamente`,
                        position: "top",
                        duration: 5500,
                        isClosable: true,
                    })
                }
            })
    });


    return (
        <form className={"mt-10"} onSubmit={onSubmit} encType="multipart/form-data">
            <Flex
                flexDirection={'row'}
                flexWrap={"wrap"}
                wrap={"wrap"}
                gap={{ base: 10, md: 10 }}
                mb={10}

            >
                <FormSelect Icon={<FaRegFlag />} label='País' table='countries' register={register} errors={errors.country} namebd='country' onChange={handleSelectChange} setValues={setValue} />

                {getValues("country") && (
                    <FormSelect Icon={<IoLocationOutline />} label='Estado' table='states' register={register} errors={errors.state} namebd='state' dependency={getValues("country")} onChange={handleSelectChange} setValues={setValue} />
                )}
                {getValues("state") && (
                    <FormSelect Icon={<IoLocationOutline />} label='Ciudad' table='cities' register={register} errors={errors.city} namebd='city' dependency={getValues("state")} onChange={handleSelectChange} setValues={setValue} />

                )}
                {getValues("city") && (
                    <FormSelect Icon={<IoLocationOutline />} label='Municipio' table='municipalities' register={register} errors={errors.municipality} namebd='municipality' dependency={getValues("city")} onChange={handleSelectChange} setValues={setValue} />
                )}
                {getValues("municipality") && (

                    <FormSelect Icon={<IoLocationOutline />} label='Parroquia' table='parishes' register={register} errors={errors.parish} namebd='parish' dependency={getValues("municipality")} onChange={handleSelectChange} setValues={setValue} />
                )}








                <FormInput Icon={<IoLocationOutline />} label='Referencia' placeholder='' type='text' register={register} errors={errors.reference} namebd='reference' />
            </Flex>
            <SaveChangesButton disabled={modified} />
            <RestarFormButton restar={() => setResetData(!resetData)} />
        </form>
    )
}

/**
 * 


           
 */
