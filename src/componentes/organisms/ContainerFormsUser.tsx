import { Box, Flex } from "@chakra-ui/react"

/**
 * Container Box for Login and Register Forms
 * @params children
 */

export const ContainerFormsUser = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <Flex
            justifyContent={'center'}
            alignItems={"center"}
            minH={"100vh"}
            bgImage={"url('/images/fondo.jpg')"}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            position={'relative'}
        >
            {/* Box Shadow for Background */}
            <Box
                position={'absolute'}
                w={'100vw'}
                h={'100vh'}
                className='colorBlue_ShadowBackground'
            />

            <Flex
                minW={'80%'}
                h={'600px'}
                border={'20px solid #fff'}
                borderRadius={'90px'}
                overflow={'hidden'}
                position={'relative'}
                className='boxShadow_NeonBlue'
            >
                {children}
            </Flex>
        </Flex>
    )
}
