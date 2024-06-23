
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { Home, Info, LockKeyhole, MapPin, Rss, User, } from 'lucide-react'
import UsersTable from '../molecules/UsersTable'


export default function AdminUsers() {

    return (
        <Flex flexDir={"column"}  overflowX={"scroll"}>
            <Text textAlign={"center"} fontSize={"xl"}>Gestión de Usuarios</Text>
            <UsersTable />
        </Flex>
    )
}
