"use client"
import React, { useEffect } from 'react'
import Navbar from '../organisms/Navbar'
import { obtainUserData } from '@/helpers/Users';
import { useRouter } from 'next/navigation';

import { Box,Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import { Home, Info, LockKeyhole, MapPin, Rss, User, } from 'lucide-react'
import AdminUsers from '../organisms/AdminUsers';
export default function AdminPanel() {

    const router = useRouter();
    useEffect(() => {
        (async () => {
            const data = await obtainUserData();
            if (data.resp === false || data.data.is_staff === false)
                router.push("/")
        })();
    }, [router]);

    return (
        <>
            <Navbar />
            <Tabs isFitted variant="enclosed" borderColor={"cyan.400"} colorScheme="neon"  >
                <TabList mb="1em" fontFamily={"NeutraText-BoldItalic"} overflowX={"auto"} overflowY={"hidden"} >
                    <Tab borderLeftRadius={"none"} _selected={{ color: "white", bg: "#1C7987" }} >
                        <Box mr={{ base: 2, md: -2 }} >
                            <User className=" w-4  md:w-8 lg:w-16 iconGlow" />
                        </Box>
                        <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} p={0} m={0} className='textGlow'>
                            Usuarios
                        </Text>
                    </Tab>
                    <Tab _selected={{ color: "white", bg: "#1C7987" }} >
                        <Box mr={{ base: 2, md: 0 }}   >
                            <Home className=" w-4  md:w-8 xl:w-16 iconGlow" />
                        </Box>
                        <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} className='textGlow'>
                            HomePage

                        </Text>
                    </Tab>
                    <Tab _selected={{ color: "white", bg: "#1C7987" }}>

                        <Box mr={{ base: 2, md: 0 }} >
                            <Info className=" w-4  md:w-8 lg:w-16 iconGlow" />
                        </Box>
                        <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} className='textGlow'>
                            Sobre Nosotros

                        </Text>

                    </Tab>
                    <Tab borderRightRadius={"none"} _selected={{ color: "white", bg: "#1C7987" }}>

                        <Box mr={{ base: 2, md: -2 }} >
                            <Rss className=" w-4  md:w-8 lg:w-16 iconGlow" />
                        </Box>
                        <Text fontSize={{ base: "sm", md: 'md', xl: "lg" }} className='textGlow'>
                            Contáctanos

                        </Text>

                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AdminUsers />
                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>

    )
}
