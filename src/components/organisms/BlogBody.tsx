"use client"
import { obtainToken } from '@/helpers/Cookies';
import { Box, Flex, Img, Tag, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios';
import { CalendarDays, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


interface BlogData {
    id: number,
    title: string,
    blog_image: string,
    content: TrustedHTML,
    created_at: Date,
    tags: [{ name: string }],
    user: {
        username: string
    }
}

const MonthSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default function BlogBody({ blogId }: { blogId: Number }) {
    const router = useRouter()
    const [blogData, setBlogData] = useState<BlogData>();
    const theme = useColorMode();
    //Obtener Data del Blog Mediante su id
    useEffect(() => {
        (async () => {
            if (!blogId) {
                router.push("blogs")
                return;
            }
            //se obtiene el token del Usuario
            const token = await obtainToken();

            if (!token) {
                alert("Error al obtener la información");
                return
            }

            //Se realiza la peticion POST a la api para registrar el blog
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blog/" + blogId + "/", { headers: { Authorization: "Token " + token.value } })
                .then((response) => {
                    if (response.status === 200) {
                        setBlogData(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener el Blog");
                    router.push("blogs")
                });
        })();
    }, [blogId, router]);
  
    if (!blogData)
        return

    const created_date = new Date(blogData.created_at);
    const date = created_date.getDate() + " de " + MonthSpanish[created_date.getMonth()] + ", " + created_date.getFullYear();

    return (
        <Flex width={"full"} flexDirection={"column"} alignItems={"center"} alignContent={"center"} gap={5} mt={20} color={theme.colorMode === "light" ? "darkBlue.400" : "gray.300"}>
            <Img src={process.env.NEXT_PUBLIC_API_URL + blogData.blog_image} h={"350px"} w={"500px"} borderRadius={"md"} />
            <Text fontSize={{ base: "2xl", md: "3xl" }} color={theme.colorMode === "light" ? "darkBlue.400" : "#F8F8F8"} >{blogData.title}</Text>
            <Flex justifyContent={"space-between"} wrap={"wrap"} gap={5} w={"40%"}>
                <Flex alignItems={"center"}>
                    <CalendarDays opacity={"0.8"} className='mx-1' size={16} />
                    <Text opacity={"0.8"} >

                        {date}
                    </Text>
                </Flex>

                <Flex alignItems={"center"}>
                    <User2 opacity={"0.8"} className='mx-1' size={16} />
                    <Text opacity={"0.8"}   >

                        @{blogData.user.username}
                    </Text>
                </Flex>
            </Flex>
            <Text mt={2} width={{ base: "90%", md: "40%" }} shadow={"base"}

                overflow={"hidden"}
                dangerouslySetInnerHTML={{ __html: blogData.content }}
                whiteSpace={"pre-line"}
                className='break-all'
            />

            <Flex justifyContent={"start"} wrap={"wrap"} w={{ base: "100%", md: "40%" }} mt={10} textColor={theme.colorMode === "light" ? "darkBlue.400" : "gray.300"} flexDirection={"column"}>

                <Text opacity={"0.8"} >

                    Etiquetas
                </Text>

                <Flex gap={2} mt={4} flexWrap={"wrap"} justifyContent={"start"} maxW={"100%"} mb={5}>
                    {blogData.tags.map((tag, index) => {

                        //Condicion para no Mostrar más de 5 etiquetas por Card
                        if (index >= 5)
                            return;

                        return (
                            <Tag bg={"#1C7987"} color={"white"} key={index}>{tag.name}</Tag>

                        )
                    })}

                </Flex>

            </Flex>
        </Flex>
    )
}
