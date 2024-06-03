
import { Box,Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LockKeyhole, MapPin, Rss, User, } from 'lucide-react'
import EditPersonalData from '../../molecules/profileEdit/EditPersonalData';
import EditAddressData from '../../molecules/profileEdit/EditAddressData';
import EditSocialsNetworks from '../../molecules/profileEdit/EditSocialNetworks';
import EditSecurityData from '../../molecules/profileEdit/EditSecurityData';
import { UserDefinition } from '@/interfaces/UserDefinition';

export default function ProfileEditRightPanel({ userData, reload }: { userData:UserDefinition | null , reload:Function}) {

    return (
        <Tabs isFitted variant="enclosed" borderColor={"cyan.400"} colorScheme="neon"  >
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
