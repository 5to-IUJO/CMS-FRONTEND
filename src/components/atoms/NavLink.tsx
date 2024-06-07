import { Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link'
import React from 'react'

export const NavLink = ({ children, href }: { children: React.ReactNode, href:string }) => (
    <Link
      as={NextLink} 
      px={2}
      py={1}
      rounded={'md'}
      color={"white.500"}
      _hover={{
        textDecoration: 'none',
        bg: "cyan.400",
      }}
      href={href} className='textGlow buttonNeon2'>
      {children}
    </Link>
  );