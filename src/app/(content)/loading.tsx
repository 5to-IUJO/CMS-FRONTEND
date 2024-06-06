import Navbar from "@/componentes/organisms/Navbar";
import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    // Loading Personalizado
    return (
        <Flex
            flexDirection={"column"}
            height={"100vh"}
            width={"100%"}
          
            justifyContent={"center"}
            color={"gray.400"}
            alignItems={"center"}
            maxH={"100vh"}
            overflow={"hidden"}

        >

            <Spinner
                thickness='4px'
                speed='0.55s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />

        </Flex  >
    );
}