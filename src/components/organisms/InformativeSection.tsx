import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

interface InformativeSectionProps {
    id: number
    bgColor: string
}

/**
 * Component for Informative Section from About Us Page
 */
export const InformativeSection = ({ id, bgColor }: InformativeSectionProps) => {
    return (
        <Flex
            key={id}
            w={'100%'}
            minH={'440px'}
            justifyContent={'center'}
            alignItems={'space-around'}
            px={'40px'}
            bg={bgColor === 'light' ? 'white.500' : 'darkBlue.700'}
            flexDirection={{ base: 'column', md: id === 1 ? 'row' : 'row-reverse' }}
        >
            <Flex w='100%' flexDirection={'column'} gap={4} justifyContent={'center'} alignItems={'center'} color={bgColor === 'light' ? 'black.400' : 'white.500'}>
                <Heading as={'h2'} fontSize={'32px'} fontFamily={'NeutraText-BoldItalic'} textAlign={{ base: 'center', lg: 'start' }} className={bgColor === 'light' ? '' : 'textGlow'}>
                    Este es un Titulo
                </Heading>
                <Text maxW='500px' fontSize={'22px'} textAlign={{ base: 'center', lg: 'start' }}>Esta es una descripcion de prueba para ver si funciona bien el texto de la seccion</Text>
            </Flex>
            <Flex as="section" w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Image w={{base: '400px'}} src="/images/logo2.png" />
            </Flex>
        </Flex>
    )
}
