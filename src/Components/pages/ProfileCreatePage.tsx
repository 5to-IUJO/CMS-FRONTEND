"use client"
import Navbar from '../organisms/Navbar'
import { Box, Flex, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import ProfileEditLeftPanel from '../organisms/ProfileEditLeftPanel'
import ProfileEditRightPanel from '../organisms/ProfileEditRightPanel'
import { obtainUserData } from '@/helpers/Users'




/**
 * Componente para el Editar Perfil del usuario
 * 
 */
export default function ProfileCreatePage() {
    interface UserDefinition {
        id: number,
        username: string,
        email: string,
        gender: number,
        date_of_birth: string,
        profile_image: string
    }

    const [userData, setUserData] = useState<UserDefinition>();

    useEffect(() => {
        (async () => {
            const data = await obtainUserData();
            if (data.resp === true)
                setUserData(data.data);
        })();
    }, []);

    return (
        <>



            <Navbar />

            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                w={"99.20vw"}
                minH={"93vh"}
                h={"100%"}
                bg={"#EBEBD3"}
                p={5}
                pr={0}
            >
                <Box w={{ base: "100%", md: "30%" }} mb="1em" borderRight={{ base: "none", md: "4px" }} borderBottom={{ base: "4px", md: "none" }} borderColor={{ base: "#1C7987", md: "#1C7987" }} >

                    <ProfileEditLeftPanel userData={userData ? userData : null} />


                </Box>
                <Box w={{ base: "100%", md: "70%" }} >

                    <ProfileEditRightPanel userData={userData ? userData : null} />

                </Box>

            </Flex>



        </>

    )
}
