"use client"
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { UserDefinition } from '@/interfaces/UserDefinition'
import BlogsBox from '@/components/molecules/BlogsBox'
import { obtainToken } from '@/helpers/Cookies'
import axios from 'axios'


export default function ProfileRightPanel({ userData }: { userData: UserDefinition | null }) {

    const [blogsData, setBlogsData] = useState<[{ title: string, content: string }]>();

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
   
    return (
        <>
            <Text textAlign={"center"} fontSize={["lg", "2xl"]} mt={2} fontWeight={"semibold"} className='textGlow'>Mis Blogs</Text>
            <Flex mt={16} justifyContent={"center"} gap={10} flexWrap={"wrap"}   >

                {(blogsData?.length ?? 0) === 0 && (
                    <Text>Sin Blogs</Text>
                )}
                {blogsData?.map((blog: any, index) => {
                    return (

                        <BlogsBox key={index} blog={blog} editable={true}/>
                    )
                })}


            </Flex>
        </>
    )
}
