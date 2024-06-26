"use client"
import { Button, Flex, Select, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Save, Trash, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi';
import DeleteUserDialog from '../atoms/DeleteUserDialog';
import axios from 'axios';
import { obtainToken } from '@/helpers/Cookies';
import { UserDefinition } from '@/interfaces/UserDefinition';
import Pagination from './Pagination';
import { useNotification } from '@/Hooks/Notification';
import { useRouter } from 'next/navigation';

export default function UsersTable() {

    const [users, setUsers] = useState<[UserDefinition]>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode();
    const cancelRef = React.useRef()
    const [roleValues, setRoleValues] = useState<{ [key: number]: number }>({});
    const { notification } = useNotification()
    const router = useRouter();


    useEffect(() => {
        (async () => {

            const token = await obtainToken();

            if (!token)
                return;

            setIsLoading(true);

            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_users", { headers: { Authorization: "Token " + token.value } })
                .then((response) => {
                    if (response.status === 200) {
                        setUsers(response.data);
                        // Inicializar roleValues con los IDs de usuario y sus roles actuales
                        const initialRoleValues: { [key: number]: number } = {};
                        response.data.forEach((data: UserDefinition) => {
                            initialRoleValues[data.id] = data.is_staff ? 1 : 0;
                        });
                        setRoleValues(initialRoleValues);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener los Usuarios");

                }).finally(() => {
                    setIsLoading(false);
                });
        })();
    }, []);



    //Variables Paginador
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users?.slice(firstIndex, lastIndex);
    const npage = Math.ceil((users?.length ? users.length : 0) / recordsPerPage)
    const numbersPagination = [...Array(npage + 1).keys()].slice(1);


    // Función para manejar el cambio en el select
    const handleRoleChange = (userId: number, value: string) => {
        const newRoleValues = { ...roleValues, [userId]: parseInt(value) };
        setRoleValues(newRoleValues);
    };

    //Cambiar Pagina del Paginador
    const changePage = (newPage: number) => {
        if (newPage < 1 || newPage > npage)
            return;
        setCurrentPage(newPage);
    }

    const handleDeleteUser = async (id: number | undefined) => {
        if (!id)
            return;

        const token = await obtainToken();

        if (!token)
            return;


        axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/delete/" + id + "/", { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    notification({ id: "userDelete", title: "Eliminar Usuario", description: "Se ha Eliminado Correctamente el Usuario", status: "success" })
                    router.refresh();
                }
            })
            .catch((error) => {
                console.log(error);
                notification({ id: "userDelete", title: "Eliminar Usuario", description: "Ha Ocurrido un Error al Eliminar al Usuario", status: "error" })

            });
    }
    const handleChangeRole = async (id: number | undefined) => {
        if (!id)
            return;

        const token = await obtainToken();

        if (!token)
            return;


        axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/update/role/" + id + "/",{is_staff:roleValues[id]}, { headers: { Authorization: "Token " + token.value } })
            .then((response) => {
                if (response.status === 200) {
                    notification({ id: "userDelete", title: "Cambio de Rol", description: "Se ha Cambiado Correctamente el Rol", status: "success" })
                    router.refresh();
                }
            })
            .catch((error) => {
                console.log(error);
                notification({ id: "userDelete", title: "Cambio de Rol", description: "Ha Ocurrido un Error al Cambier el Rol", status: "error" })

            });
    }

    if (isLoading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <>
            <Table variant={"simple"} w={"100%"} mt="30px" borderRadius={"10px"} fontSize={{ base: "12px", md: "14px", lg: "16px" }}  >
                <Thead textAlign={"center"}  >
                    <Tr >
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Nombre de Usuario</Th>
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Nombres y Apellidos</Th>
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Email</Th>
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Nacionalidad</Th>
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Tipo de Usuario</Th>
                        <Th textAlign={"center"} color={colorMode === "light" ? " black" : "white.500"} borderColor={"cyan.400"}  >Opciones</Th>
                    </Tr>
                </Thead>
                <Tbody color={colorMode === "light" ? " darkBlue.700" : "gray.300"} >

                    {!users && (
                        <Text> Sin Usuarios Encontrados</Text>
                    )}

                    {records?.map((data) => {
                        const index = data.id;
                        return (
                            <Tr key={index}>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >{data.username}</Td>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >{data.first_name} {data.second_name} {data.last_name} {data.second_last_name}</Td>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >{data.email}</Td>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >{data.nationality_name}</Td>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >
                                    <Select variant='flushed' defaultValue={data.is_staff ? 1 : 0} onChange={(e) => handleRoleChange(index, e.target.value)}
                                    >
                                        <option value={0}>Editor</option>
                                        <option value={1}>Administrador</option>

                                    </Select>


                                </Td>
                                <Td textAlign={"center"} borderColor={"cyan.400"} >
                                    <Button colorScheme='blue' leftIcon={<Save size={"20px"} />} onClick={()=>handleChangeRole(data.id)} hidden={roleValues[index] === (data.is_staff ? 1 : 0)} >Guardar Cambios</Button>
                                    <Button colorScheme='red' leftIcon={<BiTrash size={"20px"} />} ml={4} onClick={() => { setSelectedUserId(data.id); onOpen() }} >Eliminar</Button>


                                </Td>


                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
            <DeleteUserDialog isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} onClick={() => handleDeleteUser(selectedUserId)} />
            <Pagination numbers={numbersPagination} changePage={changePage} currentPage={currentPage} />
        </>
    )
}
