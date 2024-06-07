"use client"
import {
    Box,
    Flex,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Show,
    GenericAvatarIcon,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { NavLink } from '../atoms/NavLink';
import UserMenu from '../molecules/UserMenu';
import NavBarUrls from '../molecules/NavBarUrls';
import { useEffect, useState } from 'react';
import { isUserLoggin } from '@/helpers/Users';
import Link from 'next/link';
import { FaRegUser } from "react-icons/fa";


export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isLoggin, setIsLoggin] = useState<boolean>(false);

    //UseEffect que verifica si hay un usuario  logeado
    useEffect(() => {
        (async () => {
            setIsLoggin(await isUserLoggin());
        })();
    }, []);

    return (
        <Box bg={useColorModeValue('darkBlue.400', 'darkBlue.400')} px={4}    boxShadow="0 4px 12px rgba(28, 121, 135,0.6)" mb={5} fontFamily={"NeutraText-BoldItalic"}  >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />

                <NavBarUrls />

                <Flex alignItems={'center'}>
                    <Link
                    href={isLoggin ? "/dashboard" : "/login"} 
                
                    >
                    <Button
                        variant={'ghost'}
                        bg={"#1C7987"}
                        colorScheme={'blue'}
                        color={"white.500"}
                        size={'sm'}
                      
                        mr={4}
                        pl={[5,3]}
                        leftIcon={isLoggin ? <AddIcon className='iconGlow'/> : <FaRegUser className='iconGlow'/>}
                        className='buttonNeon textGlow'
                        
                        >
                        <Show above='sm'  >
                            {isLoggin ? "Nuevo Blog" : "Iniciar Sesión"}
                        </Show>
                        
                    </Button>
                    </Link>
                    <Button mr={4} onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    
                    {isLoggin && (
                        <UserMenu />
                    )}

                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <NavLink href={"blogs"} key={"blogs"}>{"Blogs"}</NavLink>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}
