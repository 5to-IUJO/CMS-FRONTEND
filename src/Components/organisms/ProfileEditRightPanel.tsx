
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LockKeyhole, MapPin, Rss, User, } from 'lucide-react'
import EditPersonalData from '../molecules/ProfileEdit/EditPersonalData';
import EditAddressData from '../molecules/ProfileEdit/EditAddressData';
import EditSocialsNetworks from '../molecules/ProfileEdit/EditSocialsNetworks';
import EditSecurityData from '../molecules/ProfileEdit/EditSecurityData';

interface UserDefinition {
    id: number,
    username: string,
    first_name:string,
    second_name:string | undefined,
    last_name:string,
    second_last_name: string | undefined,
    cedula: string,
    type: string,
    nationality: number,
    email: string,
    gender: number | null,
    date_of_birth: string,
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

export default function ProfileEditRightPanel({ userData, reload }: { userData:UserDefinition | null , reload:Function}) {

    return (
        <Tabs isFitted variant="enclosed" borderColor={"black"} colorScheme="neon"  >
            <TabList mb="1em" fontFamily={"NeutraText-BoldItalic"} overflowX={"auto"} overflowY={"hidden"} >
                <Tab borderLeftRadius={"none"} _selected={{ color: "white", bg: "#1C7987" }} >
                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <User className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} p={0} m={0}>
                        Datos Personales
                    </Text>
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>
                    <Box mr={{ base: 2, md: 0, xl: 2 }}   >
                        <MapPin className=" w-4  md:w-8 xl:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Dirección

                    </Text>
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>

                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <Rss className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Redes Sociales

                    </Text>

                </Tab>
                <Tab _selected={{ color: "white", bg: "#1C7987" }}>

                    <Box mr={{ base: 2, md: 0, xl: 2 }} >
                        <LockKeyhole className=" w-4  md:w-8 lg:w-16 " />
                    </Box>
                    <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }}>
                        Seguridad

                    </Text>

                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <EditPersonalData userData={userData} reload={reload} />
                </TabPanel>
                <TabPanel>
                    <EditAddressData userData={userData}  reload={reload} />
                </TabPanel>
                <TabPanel>
                    <EditSocialsNetworks userData={userData} reload={reload} />
                </TabPanel>
                <TabPanel>
                    <EditSecurityData reload={reload} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
