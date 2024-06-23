import { Banner } from "@/components/organisms/Banner";
import { Footer } from "@/components/organisms/Footer";
import { InformativeSection } from "@/components/organisms/InformativeSection";
import Navbar from "@/components/organisms/Navbar";
import { Box } from "@chakra-ui/react";

export default function AboutUsPage() {
    return (
        <Box position={'relative'} minH={'100vh'}>
            <Navbar />

            <Banner
                imageBackgroundBanner='fondo2.jpg'
                titleBanner="Este es el sobre nosotros"
                subTextBanner='Esta es una descripcion de prueba para ver que funciona bien el banner'
                subImageBanner='logo2.png'
                textButtonBanner='Empezar Aventura'
            />

            <InformativeSection id={1} bgColor={'light'}/>
            <InformativeSection id={2} bgColor={'dark'}/>

            <Footer />
        </Box>
    )
}
