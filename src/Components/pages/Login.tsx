import { Box, Flex} from '@chakra-ui/react'
import React from 'react'

import FormLogin from '../molecules/forms/FormLogin';


export default function Login() {
    return (
        <Flex
            justifyContent={'center'}
            alignItems={"center"}
            minH={"100vh"}
        >
            <Box
                w={{ base: "80%", md: "30%" }}
                boxShadow='xl'
                p={4}
                m={4}
            >
                <FormLogin/>

            </Box>
        </Flex>
    )
}
