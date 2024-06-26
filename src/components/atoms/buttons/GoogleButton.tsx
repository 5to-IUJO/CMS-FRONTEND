"use client"
import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';


export default function GoogleButton() {
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            // Redirigir a Google Para que el Usuario Inicie Sesión
            const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=token&scope=email profile`;
            router.push(googleAuthURL);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Center p={0}>
            <Button
                w={'full'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}
                borderColor={"gray.200"}
                _hover={{bg:"gray.100"}}
            >
                <Center >
                    <Text color={"black.400"}>Continuar con Google</Text>
                </Center>
            </Button>
        </Center>
    );
}