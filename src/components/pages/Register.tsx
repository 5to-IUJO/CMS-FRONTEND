import { Box, Flex } from '@chakra-ui/react'
import React from 'react'


import { ContainerFormsUser } from '../organisms/ContainerFormsUser';
import FormLogin from '../molecules/forms/FormLogin';
import FormRegisterUser from '../molecules/forms/FormRegisterUser';


export default function Register() {
    return (
       <ContainerFormsUser>
           <FormRegisterUser />
       </ContainerFormsUser>
    )
}
