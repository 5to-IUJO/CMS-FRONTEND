import { Button, Flex } from '@chakra-ui/react';
import React from 'react'

export default function Pagination({ numbers, changePage, currentPage }: {numbers:number[], changePage:Function, currentPage:number}) {
    return (
        <Flex mt={5}>
            <Button _hover={{ bg: 'cyan.400', color: 'white' }} _active={{ bg: 'cyan.400', color: 'white' }} onClick={() => changePage(currentPage - 1)}>
                Anterior
            </Button>
            {numbers.map((n, i) => (
                <Button _hover={{ bg: 'cyan.400', color: 'white' }} _active={{ bg: 'cyan.400', color: 'white' }} key={i} onClick={() => changePage(n)} bg={currentPage === n ? "cyan.400" : ""} color={currentPage === n ? "white" : ""}>
                    {n}
                </Button>
            ))}
            <Button _hover={{ bg: 'cyan.400', color: 'white' }} _active={{ bg: 'cyan.400', color: 'white' }} onClick={() => changePage(currentPage + 1)}>
                Siguiente
            </Button>
        </Flex>

    );
}
