"use client"
import { Center, Flex, Grid, Heading, Icon, Text, useColorMode } from "@chakra-ui/react";
import Atropos from "atropos/react";
import { Home, Info, Settings, User } from "lucide-react";
import { MdMedicalInformation } from "react-icons/md";


const icons: any = {
    Home,
    User,
    Settings,
    Info,
};

interface CardsGalleryProps {
    titleSectionCardsGalleries: string,
    cards: [
        {
            title: string,
            icon: string
        }
    ]
}

/**
 * Componet for Cards Gallery from HomePage
 */

export const CardsGallery = ({ titleSectionCardsGalleries, cards }: CardsGalleryProps) => {

    const { colorMode } = useColorMode();
    
    if(!cards)
        return;

    return (
        <Flex w={'100%'} alignItems={'center'} flexDirection={'column'} py={'20px'} px={'10px'} gap={'20px'} position={'relative'} justifyContent={'center'} my={'50px'}>
            <Heading as={'h2'} fontSize={'32px'} fontFamily={'NeutraText-BoldItalic'} className={colorMode === 'light' ? '' : 'textGlow'} textAlign={'center'}>
                {titleSectionCardsGalleries}
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {cards.map((card, index) => {
                    return (
                        <Atropos key={index}>
                            <Flex cursor={'pointer'} w={'100%'} minH='300px' minW={"300px"} flexDirection={'column'} maxW='300px' justifyContent={'center'} alignItems={'center'} bgGradient={'linear(to-l, darkBlue.400, cyan.300)'} borderRadius={'20px'} color={'white.500'}>
                                <Center>
                                    <Text w={'100%'} fontSize={'56px'} data-atropos-offset="10" className="iconGlow"><Icon as={icons[card.icon]} /></Text>
                                </Center>
                                <Text w={'100%'} fontSize={'22px'} textAlign={'center'} data-atropos-offset="-5">{card.title}</Text>
                            </Flex>
                        </Atropos>

                    )
                })}

            </Grid>
        </Flex>
    )
};
