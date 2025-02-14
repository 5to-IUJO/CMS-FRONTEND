import { AbsoluteCenter, Box, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import FormImagePageVisualizer from '../molecules/forms/FormImagePageVisualizer';
import FormHomePageBanner from '../molecules/forms/FormHomePageBanner';
import FormHomePageDataCards from '../molecules/forms/FormHomePageDataCards';

const bannerSections: any = {
    title: { top: "25%", left: "5%", width: "30%", height: "20%" },
    description: { top: "46%", left: "2%", width: "35%", height: "20%" },
    button: { top: "65%", left: "13%", width: "16%", height: "10%" },
    bannerImage: { top: "25%", right: "13%", width: "20%", height: "50%" },
    background: { top: "0", right: "0", width: "100%", height: "100%" },
};
const cardsSections: any = {
    title: { top: "12%", left: "30%", width: "40%", height: "12%" },
    description: { top: "55%", left: "38%", width: "23%", height: "20%" },
    icon: { top: "43%", left: "45%", width: "8%", height: "14%" },
  
};


export default function EditHomePage() {
    const [bannerSelection, setBannerSelection] = useState<string | null>(null);
    const [cardsSelection, setCardsSelection] = useState<string | null>(null);
    return (
        <>
            <Box position='relative' padding='8'>
                <Divider borderColor={"cyan.400"} />
                <AbsoluteCenter bg={"cyan.400"} px='4' >
                    <Text fontWeight={"semibold"} color={"white.500"} fontSize={["md", "xl"]} className='textGlow'> Banner Homepage</Text>


                </AbsoluteCenter>
            </Box>

            <Flex w={"full"} flexDir={{base:"column",md:"row"}} >
                <FormHomePageBanner setSelection={setBannerSelection} />
                <FormImagePageVisualizer newSelection={bannerSelection} image={"/images/Banner.png"} label={"Ejemplo de Banner"} sections={bannerSections} />
            </Flex>

            <Box position='relative' padding='8'>
                <Divider borderColor={"cyan.400"} />
                <AbsoluteCenter bg={"cyan.400"} px='4' >
                    <Text fontWeight={"semibold"} color={"white.500"} fontSize={["md", "xl"]} className='textGlow'> Tarjetas de Información</Text>
                </AbsoluteCenter>
            </Box>

            <Flex w={"full"} flexDir={{base:"column",md:"row"}} >
                <FormHomePageDataCards setSelection={setCardsSelection} />
                <FormImagePageVisualizer newSelection={cardsSelection} image={"/images/dataCards.png"} label={"Ejemplo de Tarjetas de Información"} sections={cardsSections}  />
            </Flex>

        </>
    )
}
