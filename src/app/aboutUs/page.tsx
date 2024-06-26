"use client"
import { Banner } from "@/components/organisms/Banner";
import { Footer } from "@/components/organisms/Footer";
import { InformativeSection } from "@/components/organisms/InformativeSection";
import Navbar from "@/components/organisms/Navbar";
import { Box, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface AboutUs {
    banner: {
        title: string,
        button: string,
        description: string,
        background_image_url: string,
        image_url: string
    }
    minibanners: [
        {
            title: string,
            description: string,
            image_url: string,
            color: string,
            align: string
        }
    ]
}


export default function AboutUsPage() {

    const [aboutus, setAboutus] = useState<AboutUs>();

    useEffect(() => {
        (async () => {
            axios.get(process.env.NEXT_PUBLIC_API_URL + "/obtain_aboutus")
                .then((response) => {

                    if (response.status === 200)
                        setAboutus(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener la información")
                })
        })();
    }, []);

    return (
        <Box position={'relative'} minH={'100vh'}>
            <Navbar />
            {!aboutus ? (
                <Spinner ></Spinner>
            ) : (
                <>
                    <Banner
                        imageBackgroundBanner={aboutus.banner.background_image_url}
                        titleBanner={aboutus.banner.title}
                        subTextBanner={aboutus.banner.description}
                        subImageBanner={aboutus.banner.image_url}
                        textButtonBanner={aboutus.banner.button}
                    />

                    {aboutus.minibanners.map((banner, index) => {
                        return (
                            <InformativeSection key={index} align={banner.align} bgColor={banner.color} title={banner.title} description={banner.description} image={banner.image_url}  />
                        );
                    })}

                </>

            )}



          

            <Footer />
        </Box>
    )
}
