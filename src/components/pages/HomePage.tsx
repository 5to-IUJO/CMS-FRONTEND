import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../organisms/Navbar'
import { Footer } from '../organisms/Footer'
import { Banner } from '../organisms/Banner'
import { CardsGallery } from '../organisms/CardsGallery'

export default function HomePage() {
  return (
    <Flex position={'relative'} minH={'100vh'} flexDirection='column'>
      <Navbar />

      <Banner
        imageBackgroundBanner='fondo2.jpg'
        titleBanner='Impulsa las noticias con tus Blogs!!!' 
        subTextBanner='Esta es una descripcion de prueba para ver que funciona bien el banner'
        subImageBanner='logo2.png'
        textButtonBanner='Empezar Aventura'
      />

      <CardsGallery titleSectionCardsGalleries="Que veras en nuestro blog?"/>

      <Footer />
    </Flex>
  )
}
