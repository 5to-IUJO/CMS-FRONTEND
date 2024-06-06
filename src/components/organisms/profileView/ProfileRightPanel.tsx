
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { UserDefinition } from '@/interfaces/UserDefinition'
import BlogsBox from '@/components/molecules/BlogsBox'


export default function ProfileRightPanel({ userData }: { userData: UserDefinition | null }) {

    return (
        <>
            <Text textAlign={"center"} fontSize={["lg", "2xl"]} mt={2} fontWeight={"semibold"}>Mis Blogs</Text>
            <Flex mt={16} justifyContent={"center"} gap={10} flexWrap={"wrap"}   >
                <BlogsBox/>
                <BlogsBox/>
                <BlogsBox/>
                <BlogsBox/>
                <BlogsBox/>
                <BlogsBox/>
                <BlogsBox/>

            </Flex>
        </>
    )
}
