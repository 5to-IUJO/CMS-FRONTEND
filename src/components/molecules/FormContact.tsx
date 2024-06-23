import { Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react'

export const FormContact = () => {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} w={{ base: '300px', sm: '400px', md: '450px', lg: '500px' }} minH={{ base: '80%', lg: '80%' }} bg={'white.500'} borderRadius={'40px'} zIndex={10} flexDirection={'column'} className="boxShadow_NeonBlue" color={'black.400'} py={'20px'}>
            <FormControl display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} px={'40px'}>
                <Heading as={'h1'} fontSize={{ base: '38px', lg: '48px' }} w={'100%'} textAlign={'center'} fontFamily={"NeutraText-BoldItalic"}>
                    Contáctanos
                </Heading>

                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                    <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'}>
                        Nombre
                    </FormLabel>
                    <Input type='text' color={'gray.400'} placeholder={'Pepito'} border={'0px'} _hover={{ bg: '#F5F5F5' }} _focusVisible={{ boxShadow: 'none' }} />
                    <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                </Flex>

                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                    <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'}>
                        Apellido
                    </FormLabel>
                    <Input type='text' color={'gray.400'} placeholder={'Perez'} border={'0px'} _hover={{ bg: '#F5F5F5' }} _focusVisible={{ boxShadow: 'none' }} />
                    <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                </Flex>

                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                    <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'}>
                        Telefono
                    </FormLabel>
                    <Input type='text' color={'gray.400'} placeholder={'Perez'} border={'0px'} _hover={{ bg: '#F5F5F5' }} _focusVisible={{ boxShadow: 'none' }} />
                    <Divider h={'2px'} bg={'cyan.400'} border={'none'} />
                </Flex>

                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} border={'0px'} mb={'20px'} w={'100%'} >
                    <FormLabel textAlign={'start'} fontSize={'22px'} w={'100%'}>
                        Mensaje
                    </FormLabel>
                    <Textarea
                        borderColor={'cyan.400'}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                        resize={'none'}
                        _hover={{ borderColor: 'cyan.400' }}
                        _focusVisible={{ boxShadow: 'none' }}
                    />
                </Flex>
                <Button w={'120px'} bg={'cyan.300'} color={'white.500'} _hover={{ bg: 'cyan.300' }} _active={{ bg: 'cyan.300' }}>
                    Enviar
                </Button>
            </FormControl>
        </Flex>
    )
}
