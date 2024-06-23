import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react"

/**
 * Component for Banners of views
 */

interface BannerProps {
    imageBackgroundBanner?: string
    titleBanner: string
    subTextBanner?: string
    subImageBanner?: string
    textButtonBanner?: string
}
export const Banner = ({ imageBackgroundBanner, titleBanner, subTextBanner, subImageBanner, textButtonBanner }: BannerProps) => {
    return (
        <Box w={'100%'} minH={{ base: '800px', sm: '600px' }} position={'relative'}>
            <Box w={'100%'} minH={'100%'} position={'absolute'} className="colorBlue_ShadowBackground" zIndex={2} />

            <Flex w={'100%'} minH={{ base: '800px', sm: '600px' }} justifyContent={'center'} alignItems={'center'} bgImage={`url('/images/${imageBackgroundBanner}')`} bgSize={'cover'} bgRepeat={'no-repeat'} p={{ base: '20px', lg: '100px' }} zIndex={1} flexDirection={{ base: 'column', lg: 'row' }} gap={8} color={'white.500'} className={imageBackgroundBanner ? '' : 'GradientBanner'}>

                {/* Banner Title, Description and Button  */}
                <Flex w='100%' h='100%' flexDirection={'column'} alignItems={'center'} gap={4} zIndex={10}>

                    {/* Title Banner */}

                    <Heading maxW={subImageBanner ? '400px' : '600px'} as={'h1'} fontSize={{ base: '42px', lg: '48px' }} fontFamily={'NeutraText-BoldItalic'} textAlign={'center'} className="textGlow">
                        {titleBanner}
                    </Heading>

                    {/* Description Banner */}

                    <Text fontSize={{ base: '26px', lg: '32px' }} maxW={subImageBanner ? '500px' : '700px'}>
                        {subTextBanner}
                    </Text>

                    {/* Button Banner */}
                    <Button display={textButtonBanner ? 'block' : 'none'} bg={'cyan.300'} fontSize={'22px'} color={'white.500'} className="textGlow buttonNeon">
                        {textButtonBanner}
                    </Button>

                </Flex>

                {/* Sub-Image or Enterprise Logo for Banner */}

                <Flex w='100%' h='100%' display={subImageBanner ? 'flex' : 'none'} flexDirection={'column'} alignItems={'center'} textAlign={'center'} zIndex={10}>
                    <Image src={`/images/${subImageBanner}`} w='400px' maxH='500px' />
                </Flex>

            </Flex>
        </Box>
    )
}
