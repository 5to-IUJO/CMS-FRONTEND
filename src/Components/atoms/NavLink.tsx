import { Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link'
import React from 'react'

export const NavLink = ({ children, href }: { children: React.ReactNode, href:string }) => (
    <Link
      as={NextLink} 
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('rgba(28, 121, 135,1)','white'),
        color : useColorModeValue('white','#0C0A08')
      }}
      href={href}>
      {children}
    </Link>
  );