import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

import FormLogin from '../molecules/FormLogin';
import FormRegisterUser from '../molecules/FormRegisterUser';
import { ContainerFormsUser } from '../organisms/ContainerFormsUser';


export default function Register() {
    return (
       <ContainerFormsUser>
           <FormRegisterUser />
       </ContainerFormsUser>
    )
}
