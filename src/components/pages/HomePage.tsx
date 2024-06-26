"use client"
import { Box, Flex, Spinner } from '@chakra-ui/react'
import Navbar from '../organisms/Navbar'
import { Footer } from '../organisms/Footer'
import { Banner } from '../organisms/Banner'
import { CardsGallery } from '../organisms/CardsGallery'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface HomePage {
  banner: {
    title: string,
    button: string,
    description: string,
    background_image_url: string,
    image_url: string
  }
  dataCards_title: string,
  datacards: [
    {
      title: string,
      icon: string
    }
  ]
}

export default function HomePage() {

  const [homepage, setHomepage] = useState<HomePage>();

  useEffect(() => {
    (async () => {
      axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_homepage")
        .then((response) => {
        
          if (response.status === 200)
            setHomepage(response.data)
        })
        .catch((error) => {
          console.log(error);
          alert("Error al obtener la información")
        })
    })();
  }, []);

  return (
    <Flex position={'relative'} minH={'100vh'} flexDirection='column'>
      <Navbar />

      {!homepage ? (
        <Spinner ></Spinner>
      ) : (
        <>
          <Banner
            imageBackgroundBanner={homepage.banner.background_image_url}
            titleBanner={homepage.banner.title}
            subTextBanner={homepage.banner.description}
            subImageBanner={homepage.banner.image_url}
            textButtonBanner={homepage.banner.button}
          />

          <CardsGallery titleSectionCardsGalleries={homepage.dataCards_title} cards={homepage.datacards}  />
        </>

      )}
      <Footer />
    </Flex>
  )
}
