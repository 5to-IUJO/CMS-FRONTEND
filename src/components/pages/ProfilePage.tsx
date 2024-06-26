"use client"
import Navbar from '../organisms/Navbar'
import { Box, Flex, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


import { obtainUserData } from '@/helpers/Users'
import ProfileLeftPanel from '../organisms/profileView/ProfileLeftPanel'
import ProfileRightPanel from '../organisms/profileView/ProfileRightPanel'
import { UserDefinition } from '@/interfaces/UserDefinition'
import { Footer } from '../organisms/Footer'




/**
 * Componente para el Editar Perfil del usuario
 * 
 */
export default function ProfilePage() {

    const [userData, setUserData] = useState<UserDefinition>();

    //obtener data del usuario
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
              
                p={5}
                pr={0}
            >
                <Box w={{ base: "100%", md: "30%" }} mb="1em" borderRight={{ base: "none", md: "4px" }} borderBottom={{ base: "4px", md: "none" }} borderColor={{ base: "#1C7987", md: "#1C7987" }} >

                    <ProfileLeftPanel userData={userData ? userData : null} />


                </Box>
                <Box w={{ base: "100%", md: "70%" }} >

                    <ProfileRightPanel userData={userData ? userData : null}  />

                </Box>

            </Flex>


            <Footer />
        </>

    )
}
