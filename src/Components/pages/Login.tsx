import { Box, Flex, Heading } from '@chakra-ui/react'

<<<<<<< HEAD
import FormLogin from '../molecules/FormLogin';
import { ContainerFormsUser } from '../organisms/ContainerFormsUser';
=======
import FormLogin from '../molecules/forms/FormLogin';
>>>>>>> ad82ee18fc6dd0bf2f2e59acef01c65375d5990e


export default function Login() {
    return (
        <ContainerFormsUser>

            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                w={'45%'}
                color={'white.400'}
                flexDir={'column'}
            >
                <Heading as={'h1'} fontSize={'42px'} textAlign={'center'}>
                    Bienvenido Blogger
                </Heading>
                <Heading as={'h1'} fontSize={'34px'} textAlign={'center'}>
                    Comienza a contarnos tu gran noticia!
                </Heading>
            </Flex>

            {/* Container FormLogin */}
            <Flex
                position={'absolute'}
                zIndex={2}
                w={'50%'}
                h={"full"}
                right={0}
                bg={'#fff'}
                borderRadius={'30px'}
                px={'50px'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                className='borderRadius_loginForm'
            >
                <FormLogin />
            </Flex>

            <Box
                bg={'#fff'}
                w={'50%'}
                h={'1000px'}
                position={'absolute'}
                zIndex={1}
                right={'5%'}
                borderRadius={'10px'}
                transform={'rotate(6deg)'}
                className='boxShadow_NeonBlue'
            />
        </ContainerFormsUser>
    )
}
