import { Link, useColorModeValue } from '@chakra-ui/react';

import React from 'react'

export const NavLink = ({ children }: { children: React.ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Link>
  );