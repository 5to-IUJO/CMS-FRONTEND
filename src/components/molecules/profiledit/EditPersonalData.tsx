

import { Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FormInput from '@/components/atoms/inputs/FormInput'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import FormRadioInput from '@/components/atoms/inputs/FormRadioInput';
import { useForm } from 'react-hook-form';
import FormCedula from '@/components/atoms/inputs/FormCedula'

import { Flag, } from 'lucide-react'
import { BsPencil } from 'react-icons/bs'
import axios from 'axios';
import SaveChangesButton from '@/components/atoms/buttons/SaveChangesButton';
import RestarFormButton from '@/components/atoms/buttons/RestarFormButton';
import FormSelectNationalities from '@/components/atoms/inputs/FormSelectNationalities';
import { equalsObjects, obtainValuesModified, validateDateOfBirth } from '@/helpers/Utilities';
import { obtainToken } from '@/helpers/Cookies';
import { UserDefinition } from '@/interfaces/UserDefinition';



export default function EditPersonalData({ userData, reload }: { userData: UserDefinition | null, reload: Function }) {
    const { handleSubmit, register, setError, getValues, watch, setValue, formState: { errors } } = useForm();
    const toast = useToast(); //Notificaciones de feedback
    const [modified, setModified] = useState<boolean>(false);
    const [resetData, setResetData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); //Loading para indicar que se esta realizando el guardado
    const gender = watch("gender");
    const allData = watch();
    //UseEffect que rellenar el form con los datos del usuario
    useEffect(() => {
        if (!userData)
            return;
        setValue("username", userData.username);
        setValue("first_name", userData.first_name);
        setValue("second_name", userData.second_name);
        setValue("last_name", userData.last_name);
        setValue("second_last_name", userData.second_last_name);
        setValue("email", userData.email);
        setValue("date_of_birth", userData.date_of_birth);
        setValue("nationality", userData.nationality);
        setValue("gender", userData.gender?.toString());
        setValue("cedula", userData.cedula);
        setValue("type", userData.type);

    }, [userData, setValue, resetData]);

    //UseEffect para cambiar el estado del boton de guardar cambios, entre desahabilitado y habilitado
    useEffect(() => {

        if (!userData)
            return

        //Cambiar la Cedula a Numero y el Genero a String para poder comparar, tambien se agrega la nationality de nuevo para evitar malas comparaciones
        const userDataToCompare = { ...userData, cedula: parseInt(userData.cedula), gender: userData?.gender?.toString(), }

        setModified(equalsObjects(userDataToCompare, allData))

    }, [userData, allData]);


    const onSubmit = handleSubmit(async data => {

        if (!userData)
            return

        const token = await obtainToken();

        if (!token)
            return

        setLoading(true)
        //Cambiar la Cedula a Numero y el Genero a String para poder comparar
        const userDataToCompare = { ...userData, cedula: parseInt(userData.cedula), gender: userData?.gender?.toString() }

        //Obtener Campos que han sido actualizados
        const updateData = obtainValuesModified(userDataToCompare, data)

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
                            description: "Tus Datos Personales han sido Actualizados Correctamente",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    reload();
                }
            })
            .catch((error) => {
                console.log(error)
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
            .finally(()=>{
                setLoading(false)
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
                <FormInput Icon={<BsPencil />} label='Primer Nombre' placeholder='José' type='text' register={register} errors={errors.first_name} namebd='first_name' />
                <FormInput Icon={<BsPencil />} label='Segundo Nombre' placeholder='Miguel' type='text' register={register} errors={errors.second_name} namebd='second_name' extraValidations={{ required: false }} />
                <FormInput Icon={<BsPencil />} label='Apellido' placeholder='Díaz' type='text' register={register} errors={errors.last_name} namebd='last_name' />
                <FormInput Icon={<BsPencil />} label='Segundo Apellido' placeholder='Cruz' type='text' register={register} errors={errors.second_last_name} namebd='second_last_name' extraValidations={{ required: false }} />
                <FormInput Icon={<FaRegUser />} label='Nombre de Usuario' placeholder='username' type='text' register={register} errors={errors.username} namebd='username' />

                <FormInput Icon={<MdOutlineEmail />} label='Correo Electrónico' placeholder='example@gmail.com' type='email' register={register} errors={errors.email} namebd='email' />
                <FormInput Icon={<CiCalendarDate />} label='Fecha de Nacimiento' placeholder='' type='date' register={register} errors={errors.date_of_birth} namebd='date_of_birth' extraValidations={{ validate: { validDate: (value:Date) => validateDateOfBirth(value) || ` No es una Fecha Válida de Nacimiento` }}} />


                <FormCedula register={register} errors={errors.cedula} errors2={errors.types} />
                <FormSelectNationalities Icon={<Flag />} label='Nacionalidad' table='nationality' register={register} errors={errors.nationality} namebd='nationality' setValues={setValue} />
                <FormRadioInput label='Genero' table={"genders"} register={register} errors={errors.gender} namebd='gender' defaultValue={gender} />
            </Flex>

            <SaveChangesButton disabled={modified} isLoading={loading} />
            <RestarFormButton restar={() => setResetData(!resetData)} />
        </form>
    )
}
