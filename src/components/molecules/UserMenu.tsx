"use client"
import { clearToken } from '@/helpers/Cookies'
import { obtainUserData } from '@/helpers/Users';
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



export default function UserMenu() {
    interface UserDefinition {
        id: number,
        username: string,
        email: string,
        gender: number,
        date_of_birth: string,
        profile_image: string,
        is_staff: boolean
    }

    const [userData, setUserData] = useState<UserDefinition>();

    useEffect(() => {
        (async () => {
            const data = await obtainUserData();
            if (data.resp === true)
                setUserData(data.data);
        })();
    }, []);

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
                    src={process.env.NEXT_PUBLIC_API_URL + "" + userData?.profile_image}
                />
            </MenuButton>
            <MenuList>
                <Link href={"/profile"}>
                    <MenuItem >Mi Perfil</MenuItem>
                </Link>
                <Link href={"/Profile-Edit"}>
                    <MenuItem >Opciones</MenuItem>
                </Link>
                {userData?.is_staff && (
                    <Link href={"/adminPanel"}>
                        <MenuItem >Panel de Administrador</MenuItem>
                    </Link>
                )}
                <MenuDivider />
                <MenuItem onClick={async () => await clearToken()}>
                    Cerrar Sesión
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
