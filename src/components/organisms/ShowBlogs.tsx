"use client"
import { obtainToken } from '@/helpers/Cookies';
import { Box, Flex, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogsBox from '../molecules/BlogsBox';



export default function ShowBlogs() {

    const [blogsData, setBlogsData] = useState<[{ title: string, content: string }]>();

    useEffect(() => {
        (async () => {
            //se obtiene el token del Usuario
            const token = await obtainToken();

            if (!token) {
                alert("Error al obtener la información");
                return
            }

            //Se realiza la peticion POST a la api para obtener los blog
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blogs", { headers: { Authorization: "Token " + token.value } })
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

    return (
        <Flex flexDir={"row"} flexWrap={"wrap"} gap={10} m={{ base: 0, md: 10 }} w={"95%"} alignContent={'center'} justifyContent={"center"}>

            {(blogsData?.length ?? 0) === 0 && (
                <Text>Sin Blogs</Text>
            )}
            {blogsData?.map((blog: any, index) => {
                return (

                    <BlogsBox key={index} blog={blog} />
                )
            })}


        </Flex>
    )
}
