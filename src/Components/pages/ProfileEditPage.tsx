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
        first_name: string,
        second_name: string | undefined,
        last_name: string,
        second_last_name: string | undefined,
        cedula: string,
        type: string,
        nationality: number,
        email: string,
        gender: number | null,
        date_of_birth: string,
        profile_image: string,
        description: TrustedHTML,
        address: {
            id: number,
            reference: string,
            country: number,
            state: number | null,
            city: number | null,
            municipality: number | null,
            parish: number | null,
            postalcode: number | null
        },
        url:string,
        urlImage:string,
        x:string,
        instagram:string,
        tiktok:string,
        
    }

    const [userData, setUserData] = useState<UserDefinition>();
    const [reload,setReload] = useState<boolean>(false);
    //obtener data del usuario
    useEffect(() => {
        (async () => {
            const data = await obtainUserData();
            if (data.resp === true)
                setUserData(data.data);
        })();
    }, [reload]);

    const reloadData = () =>{
        setReload(!reload)
    }

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

                    <ProfileEditLeftPanel userData={userData ? userData : null} reload={reloadData} />


                </Box>
                <Box w={{ base: "100%", md: "70%" }} >

                    <ProfileEditRightPanel userData={userData ? userData : null} reload={reloadData} />

                </Box>

            </Flex>



        </>

    )
}
