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
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { NavLink } from '../atoms/NavLink';
import UserMenu from '../molecules/UserMenu';
import NavBarUrls from '../molecules/NavBarUrls';



export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
                    <Button
                        variant={'solid'}
                        colorScheme={'blue'}
                        size={'sm'}
                        mr={4}
                        pl={[5,3]}
                        leftIcon={<AddIcon />}>
                        <Show above='sm'>
                            Nuevo Blog
                        </Show>
                        
                    </Button>

                    <Button mr={4} onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>

                    <UserMenu />
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <NavLink key={"link"}>{"asd"}</NavLink>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}
