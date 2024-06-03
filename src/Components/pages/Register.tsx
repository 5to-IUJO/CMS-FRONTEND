import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

<<<<<<< HEAD
import FormLogin from '../molecules/FormLogin';
import FormRegisterUser from '../molecules/FormRegisterUser';
import { ContainerFormsUser } from '../organisms/ContainerFormsUser';
=======
import FormLogin from '../molecules/forms/FormLogin';
import FormRegisterUser from '../molecules/forms/FormRegisterUser';
>>>>>>> ad82ee18fc6dd0bf2f2e59acef01c65375d5990e


export default function Register() {
    return (
       <ContainerFormsUser>
           <FormRegisterUser />
       </ContainerFormsUser>
    )
}
