
import Navbar from "@/Components/organisms/Navbar";
import { Flex, Image, Text } from "@chakra-ui/react";


export default function Custom404() {
  return (

    <>
      <Navbar/>
      <Flex minH="90vh" w={"full"} gap={10} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} mt={5} >
        <Text textAlign={"center"} fontSize={"xl"}>Ops, parece que ha ocurrido un Error!</Text>
        <Image src={"/images/error colored.svg"} alt='error 404' w={{ base: "full", md: "50%" }} h={{ base: "60%", md: "50%" }} />
      </Flex>
    </>

  );
}