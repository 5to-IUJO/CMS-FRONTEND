'use client'
//Configuracion Chakra UI
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}