"use client"
import { obtainToken } from '@/helpers/Cookies';
import { Box, Flex, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogsBox from '../molecules/BlogsBox';
import Pagination from '../molecules/Pagination';



export default function ShowBlogs() {

    const [blogsData, setBlogsData] = useState<[{ title: string, content: string }]>();
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        (async () => {

            //Se realiza la peticion POST a la api para obtener los blog
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blogs",)
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
        return (<Text minH={"100vh"}>Sin Blogs</Text>);
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
        <Flex flexDir={"column"} alignItems={"center"} minH={"100vh"} mb={10}>
            <Flex flexDir={"row"} flexWrap={"wrap"} gap={10} m={{ base: 0, md: 10 }} w={"95%"} alignContent={'center'} justifyContent={"center"}>


                {records?.map((blog: any, index) => {
                    return (

                        <BlogsBox key={index} blog={blog} />
                    )
                })}

            </Flex>
            <Pagination numbers={numbersPagination} changePage={changePage} currentPage={currentPage} />
        </Flex>
    )
}
