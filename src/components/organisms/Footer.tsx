"use client"
import { useEffect, useState } from "react";
import { Button, Divider, Flex, Grid, Heading, Image, List, ListItem, Text, useColorModeValue } from "@chakra-ui/react"
import { FaFacebook, FaInstagram, FaInternetExplorer, FaRegFlag, FaRegUser, FaTiktok } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";
import { isUserLoggin } from "@/helpers/Users";
import Link from "next/link";

/**
 *  Component for desing footer 
 */

export const Footer = () => {

  const [isLoggin, setIsLoggin] = useState<boolean>(false);

  //UseEffect que verifica si hay un usuario  logeado
  useEffect(() => {
    (async () => {
      setIsLoggin(await isUserLoggin());
    })();
  }, []);

  return (
    <Flex w={'100%'} minH='300px' bg={useColorModeValue('darkBlue.400', 'darkBlue.400')} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} p={'14px'} color={"white.500"} className="boxShadow_NeonBlue" as={'footer'} position={'absolute'} bottom={{base: '-487', lg: '-300'}} left={0}>
      <Heading as={'h3'} fontSize={'32px'} mb={'20px'} className="textGlow ">Quieres saber mas?</Heading>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)'}} gap={4}>

        {/* Enterprise Logo */}
        <Flex flexDirection={'column'} alignItems={'center'} textAlign={'center'} gap={4} w={'100%'} borderRight={{ base: 'none', lg:'1px #1C7987 solid'}} pr={'5px'}>
          <Flex justifyContent={"center"}>

            <Image src={"/images/Logo2.png"} alt='Vg-Blogs Logo' className='iconGlowHover' w={20} h={14} />

            <Image src={"/images/Logo Texto.png"} alt='Vg-Blogs Logo' className='iconGlowHover' w={40} h={12} mt={"-2"} />
          </Flex>
          <Flex fontSize={'32px'} gap={4} >
            <FaFacebook cursor={'pointer'} className="iconGlow"/>
            <FaInstagram cursor={'pointer'} className="iconGlow"/>
            <FaTiktok cursor={'pointer'} className="iconGlow"/>
          </Flex>
        </Flex>

        <Divider bg={'#1C7987'} mb='10px' display={{base: 'box', lg: 'none'}}/>

        {/* Contact Information */}
        <Flex flexDirection={'column'} alignItems={'center'} textAlign={'center'} gap={4} w={'100%'}>
          <Heading as={'h4'} fontSize={'28px'} fontFamily={"NeutraText-BoldItalic"}>Informacion de contacto</Heading>
          <List>
            <ListItem>
              Correo: prueba@email.com
            </ListItem>

            <ListItem>
              Telefono: 04163698724
            </ListItem>
            <ListItem>
              Direccion: Tucupita alli mismo al lao de la matica
            </ListItem>
          </List>
        </Flex>

        <Divider bg={'#1C7987'} mb='10px' display={{base: 'box', lg: 'none'}}/>

        {/* Contact Button */}
        <Flex flexDirection={'column'} alignItems={'center'} textAlign={'center'} gap={4} w={'100%'} borderLeft={{base: 'none', lg: '1px #1C7987 solid'}} pl={'20px'}>
          <Heading as={'h4'} fontSize={'28px'} fontFamily={"NeutraText-BoldItalic"}>Envia tu contacto ¡Ahora!</Heading>
          <Link
            href={isLoggin ? "/contact" : "/login"}
          >
            <Button variant={'ghost'} bg={"#1C7987"} className="buttonNeon textGlow" color={"white.500"} rightIcon={<LuMoveRight className="iconGlow" />}>
              Contactanos
            </Button>
          </Link>
        </Flex>
      </Grid>
    </Flex>
  )
}