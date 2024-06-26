import { AbsoluteCenter, Box, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import FormImagePageVisualizer from '../molecules/forms/FormImagePageVisualizer';
import FormAboutUsBanner from '../molecules/forms/FormAboutUsBanner';
import FormAboutUsMiniBanners from '../molecules/forms/FormAboutUsMiniBanners';

const bannerSections: any = {
    title: { top: "25%", left: "5%", width: "30%", height: "20%" },
    description: { top: "46%", left: "2%", width: "35%", height: "20%" },
    button: { top: "65%", left: "13%", width: "16%", height: "10%" },
    bannerImage: { top: "25%", right: "13%", width: "20%", height: "50%" },
    background: { top: "0", right: "0", width: "100%", height: "100%" },
};
const minibannersSection: any = {
    title: { top: "14%", left: "17%", width: "17%", height: "10%" },
    description: { top: "22%", left: "15%", width: "22%", height: "10%" },
    color: { top: "0%", left: "0", width: "100%", height: "51%" },
    align: { top: "14%", left: "15%", width: "23%", height: "20%" },
    image: { top: "3%", right: "15%", width: "20%", height: "40%" },
  
};


export default function EditAboutUs() {
    const [bannerSelection, setBannerSelection] = useState<string | null>(null);
    const [miniBannerSelection, setminiBannerSelection] = useState<string | null>(null);
    return (
        <>
            <Box position='relative' padding='8'>
                <Divider borderColor={"cyan.400"} />
                <AbsoluteCenter bg={"cyan.400"} px='4' >
                    <Text fontWeight={"semibold"} color={"white.500"} fontSize={["md", "xl"]} className='textGlow'> Banner Sobre Nosotros</Text>


                </AbsoluteCenter>
            </Box>

            <Flex w={"full"} flexDir={{base:"column",md:"row"}} >
                <FormAboutUsBanner setSelection={setBannerSelection} />
                <FormImagePageVisualizer newSelection={bannerSelection} image={"/images/banner.png"} label={"Ejemplo de Banner"} sections={bannerSections} />
            </Flex>

            <Box position='relative' padding='8'>
                <Divider borderColor={"cyan.400"} />
                <AbsoluteCenter bg={"cyan.400"} px='4' >
                    <Text fontWeight={"semibold"} color={"white.500"} fontSize={["md", "xl"]} className='textGlow'> Mini Banner</Text>
                </AbsoluteCenter>
            </Box>

            <Flex w={"full"} flexDir={{base:"column",md:"row"}} >
                <FormAboutUsMiniBanners setSelection={setminiBannerSelection} />
                <FormImagePageVisualizer newSelection={miniBannerSelection} image={"/images/minibanners.png"} label={"Ejemplo de Mini Banners"} sections={minibannersSection}  />
            </Flex>

        </>
    )
}
