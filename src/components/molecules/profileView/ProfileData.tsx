import { UserDefinition } from '@/interfaces/UserDefinition'
import { EmailIcon } from '@chakra-ui/icons'
import { AbsoluteCenter, Avatar, AvatarBadge, Box, Button, Center, Divider, Flex, FormControl, IconButton, Input, Link, List, ListIcon, ListItem, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { Edit2, Flag } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { FaFacebook, FaGenderless, FaInstagram, FaInternetExplorer, FaTiktok, FaTransgender } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { PiGenderIntersex } from 'react-icons/pi'
import { TbGenderBigender } from 'react-icons/tb'

export default function ProfileData({ userData }: { userData: UserDefinition | null }) {
    let genderIcon

    if (userData?.gender_name === "Masculino")
        genderIcon = BsGenderMale
    else if (userData?.gender_name === "Femnino")
        genderIcon = BsGenderFemale
    else
        genderIcon = FaTransgender
    
    const facebookHoverColor = useColorModeValue({ color: "blue" }, { color: "blue.300" })
    const instagramHoverColor = useColorModeValue({ color: "purple" }, { color: "purple.300" })
    const xHoverColor = useColorModeValue({ color: "blue" }, { color: "blue.300" })
    const tiktokHoverColor = useColorModeValue({ color: "purple" }, { color: "purple.300" })
    return (
        <Box >



            <Box position='relative' padding='8'>
                <Divider borderColor={"cyan.400"} />
                <AbsoluteCenter bg={"cyan.400"}px='4' >
                    <Text fontWeight={"semibold"}color={"white.500"} fontSize={["md", "xl"]}> Perfil de Usuario</Text>
                </AbsoluteCenter>
            </Box>


            <Stack direction={['column', 'column']} spacing={6} mt={5}>
                <Center>
                    <Avatar size="2xl" src={process.env.NEXT_PUBLIC_API_URL + "" + userData?.profile_image} bg={"gray"} />

                </Center>
                <Text textAlign={"center"} fontSize={["md", "xl"]} fontWeight={"semibold"}  >
                    {userData?.first_name} {userData?.second_name} {userData?.last_name} {userData?.second_last_name}


                </Text>
                <Text fontWeight={"normal"} fontStyle={'italic'} textAlign={"center"} fontSize={["md", "lg"]} > @{userData?.username} </Text>
            </Stack>
            <List spacing={3} mt={4} >
                <ListItem>
                    <ListIcon as={EmailIcon} color='#1C7987' />
                    {userData?.email}
                </ListItem>
                <ListItem>
                    <ListIcon as={genderIcon} color='#1C7987' />
                    {userData?.gender_name}
                </ListItem>
                <ListItem>
                    <ListIcon as={Flag} color='#1C7987' />
                    {userData?.nationality_name}
                </ListItem>
                {userData?.url && (

                    <ListItem>
                        <Link href={userData?.url} _hover={{color:"#1C7987"}}>
                            <ListIcon as={FaInternetExplorer} color='#1C7987' />
                            {userData?.url}
                        </Link>
                    </ListItem>
                )}

            </List>

            <Box textAlign={'justify'} p={5} pr={10} fontWeight={"medium"}>
                <Text fontSize={["md", "lg"]} ml={"-4"}>Mi Descripción</Text>
                {userData?.description && (
                    <>
                        <Text

                            wordBreak={"break-word"}
                            whiteSpace={"pre-wrap"}
                            overflowWrap={"break-word"}
                            maxWidth="100%"
                            overflow="hidden"
                            dangerouslySetInnerHTML={{ __html: userData.description }}></Text>
                    </>
                )}
                {!userData?.description && (
                    <text>Sin Descripción</text>
                )}
            </Box>

            <Flex color={"gray"} justifyContent={"center"} fontSize={"24px"} mt={4} >
                {userData?.facebook && (

                    <Tooltip label={userData.facebook} hasArrow>
                        <Link href={"https://www.facebook.com/" + userData.facebook}>

                            <Button fontSize={"24px"} _hover={facebookHoverColor} variant={"ghost"}>
                                <FaFacebook />
                            </Button>
                        </Link>

                    </Tooltip>
                )}

                {userData?.instagram && (

                    <Tooltip label={userData?.instagram} hasArrow>
                        <Link href={"https://www.instagram.com/" + userData.instagram.slice(1)}>
                            <Button fontSize={"24px"} _hover={instagramHoverColor} variant={"ghost"}>
                                <FaInstagram />
                            </Button>
                        </Link>
                    </Tooltip>
                )}
                {userData?.x && (

                    <Tooltip label={userData?.x} hasArrow>
                        <Link href={"https://x.com/" + userData.x}>
                            <Button fontSize={"24px"} _hover={xHoverColor} variant={"ghost"}>
                                <FaXTwitter />
                            </Button>
                        </Link>

                    </Tooltip>
                )}
                {userData?.tiktok && (

                    <Tooltip label={userData?.tiktok} hasArrow>
                        <Link href={"https://www.tiktok.com/" + userData.tiktok}>
                            <Button fontSize={"24px"} _hover={ tiktokHoverColor } variant={"ghost"}>
                                <FaTiktok />
                            </Button>
                        </Link>

                    </Tooltip>
                )}

            </Flex>

        </Box>
    )
}
