import { Button, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Trash, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi';
import DeleteUserDialog from '../atoms/DeleteUserDialog';
import axios from 'axios';
import { obtainToken } from '@/helpers/Cookies';
import { UserDefinition } from '@/interfaces/UserDefinition';
import Pagination from './Pagination';

export default function UsersTable() {
    
    const [users, setUsers] = useState<[UserDefinition]>();
    const [currentPage, setCurrentPage] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    useEffect(() => {
        (async () => {
            const token = await obtainToken();

            if (!token)
                return;

            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_users", { headers: { Authorization: "Token " + token.value } })
                .then((response) => {
                    if (response.status === 200) {
                        setUsers(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener los Usuarios");

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

    //Cambiar Pagina del Paginador
    const changePage = (newPage: number) => {
        if (newPage < 1 || newPage > npage)
            return;
        setCurrentPage(newPage);
    }

    return (
        <Table variant={"simple"} w={"90%"} mt="30px" borderRadius={"10px"}  >
            <Thead textAlign={"center"}  >
                <Tr >
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Nombre de Usuario</Th>
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Nombres y Apellidos</Th>
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Email</Th>
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Nacionalidad</Th>
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Tipo de Usuario</Th>
                    <Th textAlign={"center"} color={useColorModeValue("black", "white.500")} borderColor={"cyan.400"}  >Opciones</Th>
                </Tr>
            </Thead>
            <Tbody color={useColorModeValue("darkBlue.700", "gray.300")} >

                {!users && (
                    <Text> Sin Usuarios Encontrados</Text>
                )}
                
                {records?.map((data, index) => {
                    return (
                        <Tr key={index}>
                            <Td textAlign={"center"} borderColor={"cyan.400"} >{data.username}</Td>
                            <Td textAlign={"center"} borderColor={"cyan.400"} >{data.first_name} {data.second_name} {data.last_name} {data.second_last_name}</Td>
                            <Td textAlign={"center"} borderColor={"cyan.400"} >{data.email}</Td>
                            <Td textAlign={"center"} borderColor={"cyan.400"} >{data.nationality_name}</Td>
                            <Td textAlign={"center"} borderColor={"cyan.400"} >{data.is_staff ? "Administrador" : "Editor"}</Td>
                            <Td textAlign={"center"} borderColor={"cyan.400"} > <Button colorScheme='red' leftIcon={<BiTrash size={"20px"} />} onClick={onOpen} >Eliminar</Button></Td>


                        </Tr>
                    )
                })}
               
            </Tbody>
            <DeleteUserDialog isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} />
            <Pagination numbers={numbersPagination} changePage={changePage} currentPage={currentPage} />
        </Table>
    )
}
