import { Footer } from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { Box } from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Box position={'relative'} minH={'100vh'}>
        <Navbar />

        <Footer />
    </Box>
  )
}
