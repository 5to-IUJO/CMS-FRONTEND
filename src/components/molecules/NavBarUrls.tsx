import { Box, Flex, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from '../atoms/NavLink'
import Link from 'next/link'

export default function NavBarUrls() {
    return (
        <HStack spacing={8} alignItems={'center'} textColor={useColorModeValue('white.400', 'white.400')} >
            <Link href={"/dashboard"}>
                <Flex alignItems={"center"} justifyContent={"center"}>

                    <Image src={"/images/Logo2.png"} alt='Vg-Blogs Logo' className='iconGlowHover' w={20} h={14} />
        
                    <Image src={"/images/Logo Texto.png"} alt='Vg-Blogs Logo' className='iconGlowHover' w={40} h={12} mt={"-2"}   display={{ base: 'none', md: 'flex' }} />
                </Flex>
            </Link>
            <HStack

                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <NavLink href={"aboutUs"} key={"aboutUs"} >Sobre Nosotros</NavLink>
                <NavLink href={"blogs"} key={"blogs"}>Blogs</NavLink>
            </HStack>
        </HStack>
    )
}
