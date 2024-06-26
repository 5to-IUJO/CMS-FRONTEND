"use client"
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { UserDefinition } from '@/interfaces/UserDefinition'
import BlogsBox from '@/components/molecules/BlogsBox'
import { obtainToken } from '@/helpers/Cookies'
import axios from 'axios'
import Pagination from '@/components/molecules/Pagination'


export default function ProfileRightPanel({ userData }: { userData: UserDefinition | null }) {

    const [blogsData, setBlogsData] = useState<[{ title: string, content: string }]>();
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        (async () => {
            //se obtiene el token del Usuario
            const token = await obtainToken();

            if (!token) {
                alert("Error al Registrar al obtener la información");
                return
            }

            //Se realiza la peticion POST a la api para obtener los blog
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blogs/user", { headers: { Authorization: "Token " + token.value } })
                .then((response) => {
                    if (response.status === 200) {

                        setBlogsData(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener los Blogs");
                });
        })();
    }, []);


    if (!blogsData || !blogsData.length) {
        return (<Text>Sin Blogs</Text>);
    }

    //Variables Paginador
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = blogsData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(blogsData.length / recordsPerPage)
    const numbersPagination = [...Array(npage + 1).keys()].slice(1);

    //Cambiar Pagina del Paginador
    const changePage = (newPage: number) => {
        if (newPage < 1 || newPage > npage)
            return;
        setCurrentPage(newPage);
    }


    return (
        <Flex flexDir={"column"} alignItems={"center"} mb={10}>
            <Text textAlign={"center"} fontSize={["lg", "2xl"]} mt={2} fontWeight={"semibold"} className='textGlow'>Mis Blogs</Text>
            <Flex mt={16} justifyContent={"center"} gap={10} flexWrap={"wrap"}  mb={10}  >

   
                {records?.map((blog: any, index) => {
                    return (

                        <BlogsBox key={index} blog={blog} editable={true} />
                    )
                })}


            </Flex>

            <Pagination numbers={numbersPagination} changePage={changePage} currentPage={currentPage} />
        </Flex>
    )
}
