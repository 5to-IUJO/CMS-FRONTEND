import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from '../atoms/NavLink'

export default function NavBarUrls() {
    return (
        <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <NavLink key={"asd"}>asd</NavLink>
                <NavLink key={"asd"}>asd</NavLink>
                <NavLink key={"asd"}>asd</NavLink>
            </HStack>
        </HStack>
    )
}
