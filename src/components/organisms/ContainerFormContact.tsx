import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react"
import { FormContact } from "../molecules/forms/FormContact"

/**
 * Component for Container Form Contact from Contact Page
 */
export const ContainerFormContact = () => {
  return (
    <Flex minH='100vh' justifyContent={'center'} alignItems={'center'} w={'100%'} bgImage={'/images/fondo.jpg'} bgSize={'cover'} bgRepeat={'no-repeat'} position={'relative'} py={'40px'}>

      <Box w={'100%'} h={'100%'} position={'absolute'} className="colorBlue_ShadowBackground" />

      <FormContact />
    </Flex>
  )
}
