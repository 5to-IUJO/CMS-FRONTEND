import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

interface InformativeSectionProps {
    align: string,
    bgColor: string
    title: string,
    description: string,
    image: string
}

/**
 * Component for Informative Section from About Us Page
 */
export const InformativeSection = ({ align, bgColor, title, description, image }: InformativeSectionProps) => {
    return (
        <Flex
            w={'100%'}
            minH={'440px'}
            justifyContent={'center'}
            alignItems={'space-around'}
            px={'40px'}
            bg={bgColor === 'light' ? 'white.500' : 'darkBlue.700'}
            flexDirection={{ base: 'column', md: align === "left"  ? 'row' : 'row-reverse' }}
        >
            <Flex w='100%' flexDirection={'column'} gap={4} justifyContent={'center'} alignItems={'center'} color={bgColor === 'light' ? 'black.400' : 'white.500'}>
                <Heading as={'h2'} fontSize={'32px'} fontFamily={'NeutraText-BoldItalic'} textAlign={{ base: 'center', lg: 'start' }} className={bgColor === 'light' ? '' : 'textGlow'}>
                    {title}
                </Heading>
                <Text maxW='500px' fontSize={'22px'} textAlign={{ base: 'center', lg: 'start' }} dangerouslySetInnerHTML={{ __html: description }}></Text>
            </Flex>
            <Flex as="section" w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Image w={{base: '400px'}} src={`${process.env.NEXT_PUBLIC_API_URL}/${image?.startsWith("staticsImages/") ? image : "media/" + image}`} />
            </Flex>
        </Flex>
    )
}
