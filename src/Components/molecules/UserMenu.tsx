"use client"
import { clearToken } from '@/helpers/Cookies'
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

export default function UserMenu() {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                />
            </MenuButton>
            <MenuList>
                <MenuItem>Opciones</MenuItem>
                <MenuDivider />
                <MenuItem onClick={async () => await clearToken()}>
                    Cerrar Sesión
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
