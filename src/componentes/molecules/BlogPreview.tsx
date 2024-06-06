import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface BlogPreviewProps {
    blog:{
        title:string,
        content: HTMLElement
    }
}

export default function BlogPreview({blog}:BlogPreviewProps) {
    return (
        <Box p={5} w={{base: "95%" ,md: "20%"}}  height={"35vh"} boxShadow={"xs"} rounded={"lg"} overflow={'hidden'}>
            <Text fontSize={"xl"} mb={5} textAlign={'center'}>{blog.title}</Text>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Box>
    )
}
