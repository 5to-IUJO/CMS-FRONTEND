import { Box, Flex, Image, Tag, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
/**
 * Componente de una Box que contiene datos sobre los blogs
 */
export default function BlogsBox() {
    return (
        <Link href="#" >
            <Box borderRadius={"lg"} boxShadow={"md"} bg={"gray.200"} textAlign={"center"} pb={"4"}
                _hover={{
                    bg: "gray.300",
                    transition: "background-color 0.3s ease",
                    '& img': {
                        filter: "brightness(0.8)"
                    }
                }} >
                <Image alt={"blog_image"} borderTopRadius={"lg"} src={"/images/example_blogs.jpeg"} w={"250px"} />
                <Text fontSize={["md", "xl"]} mt={2}>
                    Título Blog

                </Text>
                <Text opacity={"0.8"}>
                    3 de Junio, 2024

                </Text>
                <Flex gap={2} mt={4} flexWrap={"wrap"} justifyContent={"center"} maxW={"250px"}>
                    <Tag bg={"#1C7987"} color={"white"}>Etiqueta 1</Tag>
                    <Tag bg={"#1C7987"} color={"white"}>Etiqueta 2</Tag>
                    <Tag bg={"#1C7987"} color={"white"}>Etiqueta 3</Tag>

                </Flex>

            </Box>
        </Link>
    )
}
