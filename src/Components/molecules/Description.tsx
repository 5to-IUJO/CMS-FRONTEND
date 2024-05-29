import { AbsoluteCenter, AvatarBadge, Box, Divider, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { Edit2 } from 'lucide-react'
import React from 'react'

/**
 * Componente para Mostrar la Descripción de los Usuarios
 */
export default function Description() {
    return (
        <Box m={5}>
            <Box position='relative' padding='6'>
                <Divider borderColor={'#171B27'} />
                <AbsoluteCenter bg={"#EBEBD3"} px='4' >
                    <Text fontWeight={"semibold"} color={"#171B27"} fontSize={["md", "xl"]}> Mi Descripción</Text>
                </AbsoluteCenter>
            </Box>



            <Box textAlign={'justify'} p={5} pr={10} fontWeight={"medium"} color={"#212738"}>
                &ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quos porro laboriosam libero unde harum incidunt dolor,
                consequatur necessitatibus quam explicabo cum consequuntur esse natus! Perspiciatis aut voluptate dolorum labore?
                &rdquo;
                <Tooltip label='Editar Descripción' hasArrow placement='right' > 
                <Box
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-8px"
                    aria-label="change description"
                    icon={<Edit2 />}
                    bg={"transparent"}
                    _hover={
                        {
                            
                            color:"#1C7987"
                        }
                    }

                />
                </Tooltip>
            </Box>
        </Box>
    )
}
