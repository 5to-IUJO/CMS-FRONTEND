import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from '../atoms/NavLink'

export default function NavBarUrls() {
    return (
        <HStack spacing={8} alignItems={'center'} textColor={useColorModeValue('#0C0A08', 'white')} >
            <Box>Logo</Box>
            <HStack
              
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <NavLink href={"aboutUs"} key={"aboutUs"}>Sobre Nosotros</NavLink>
                <NavLink href={"blogs"} key={"blogs"}>Blogs</NavLink>
            </HStack>
        </HStack>
    )
}
