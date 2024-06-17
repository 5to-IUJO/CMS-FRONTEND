import { Box, Flex, Image, Tag, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { CalendarDays, Edit2, SquareUser, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
/**
 * Componente de una Box que contiene datos sobre los blogs
 */

interface BlogProps {
    blog: {
        id: number
        title: string,
        created_at: string,
        blog_image: string,
        tags: [{ name: string }],
        user: { username: string }
    },
    editable?: boolean
}

const MonthSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default function BlogsBox({ blog, editable = false }: BlogProps) {
    const backgroundColor = useColorModeValue("gray.200", "darkBlue.400")
    const backgroundColorHover = useColorModeValue("gray.300", "darkBlue.700")

    const created_date = new Date(blog.created_at);
    const date = created_date.getDate() + " de " + MonthSpanish[created_date.getMonth()] + ", " + created_date.getFullYear();


    return (
        <Link href={"/blogs/" + blog.id} >
            <Box position={"relative"} borderRadius={"lg"} boxShadow={"md"} bg={backgroundColor} textAlign={"center"} pb={"4"} minH={"350px"} maxHeight={"400px"}
                _hover={{
                    bg: backgroundColorHover,
                    transition: "background-color 0.3s ease",
                    '& img': {
                        filter: "brightness(0.8)"
                    },'& .edit-icon': {
                        opacity: 1,
                        transition: "opacity 0.3s ease"
                    }
                }} >
                <Image alt={"blog_image"} borderTopRadius={"lg"} src={process.env.NEXT_PUBLIC_API_URL + "" + blog.blog_image} w={"280px"} h={"180px"} />
                <Text fontSize={"xl"} mt={2}>
                    {blog.title}

                </Text>
                <Flex alignContent={"center"} alignItems={"center"} justifyContent={"center"} wrap={"wrap"} gap={5} maxW={"280px"}>
                    <Flex alignContent={"center"} alignItems={"center"}>
                        <CalendarDays opacity={"0.8"} className='mx-1' size={16} />
                        <Text opacity={"0.8"} >

                            {date}
                        </Text>
                    </Flex>

                    <Flex alignContent={"center"} alignItems={"center"}>
                        <User2 opacity={"0.8"} className='mx-1' size={16} />
                        <Text opacity={"0.8"}   >

                            @{blog.user.username}
                        </Text>
                    </Flex>
                </Flex>

                <Flex gap={2} mt={4} flexWrap={"wrap"} justifyContent={"center"} maxW={"280px"}>
                    {blog.tags.map((tag, index) => {

                        //Condicion para no Mostrar más de 5 etiquetas por Card
                        if (index >= 5)
                            return;

                        return (
                            <Tag bg={"#1C7987"} color={"white"} key={index}>{tag.name}</Tag>
                        )
                    })}

                </Flex>
                {editable && (
                    <Tooltip label={"Editar Blog"} hasArrow placement={"right"}  bg="white" color={"black"}>
                    <Flex className="edit-icon" position="absolute" top={2} right={2} zIndex={1}>
                        <Link href={`/blogs/edit/${blog.id}`}>
                            <Box p={2} bg="white" borderRadius="full" cursor="pointer" color={"black"}>
                                <Edit2 size={16} />
                            </Box>
                        </Link>
                    </Flex>
                    </Tooltip>
                )}
            </Box>
        </Link>
    )
}
