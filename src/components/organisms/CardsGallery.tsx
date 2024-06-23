"use client"
import { Center, Flex, Grid, Heading, Text, useColorMode } from "@chakra-ui/react";
import Atropos from "atropos/react";
import { MdMedicalInformation } from "react-icons/md";



const cards = [
    { id: 1, icon: <MdMedicalInformation />, text: "En nuestro blog podras encontrar informacion" },
    { id: 2, icon: <MdMedicalInformation />, text: "En nuestro blog podras encontrar informacion" },
    { id: 3, icon: <MdMedicalInformation />, text: "En nuestro blog podras encontrar informacion" },
];

interface CardsGalleryProps {
    titleSectionCardsGalleries: string
}

/**
 * Componet for Cards Gallery from HomePage
 */

export const CardsGallery = ({ titleSectionCardsGalleries }: CardsGalleryProps) => {

    const { colorMode } = useColorMode();

    return (
        <Flex w={'100%'} alignItems={'center'} flexDirection={'column'} py={'20px'} px={'10px'} gap={'20px'} position={'relative'} justifyContent={'center'} my={'50px'}>
            <Heading as={'h2'} fontSize={'32px'} fontFamily={'NeutraText-BoldItalic'} className={colorMode === 'light' ? '' : 'textGlow'} textAlign={'center'}>
                {titleSectionCardsGalleries}
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {cards.map((card) => {
                    return (
                        <Atropos key={card.id}>
                            <Flex cursor={'pointer'} w={'100%'} minH='300px' flexDirection={'column'} maxW='300px' justifyContent={'center'} alignItems={'center'} bgGradient={'linear(to-l, darkBlue.400, cyan.300)'} borderRadius={'20px'} color={'white.500'}>
                                <Center>
                                    <Text w={'100%'} fontSize={'56px'} data-atropos-offset="10" className="iconGlow">{card.icon}</Text>
                                </Center>
                                <Text w={'100%'} fontSize={'22px'} textAlign={'center'} data-atropos-offset="-5">{card.text}</Text>
                            </Flex>
                        </Atropos>

                    )
                })}

            </Grid>
        </Flex>
    )
};
