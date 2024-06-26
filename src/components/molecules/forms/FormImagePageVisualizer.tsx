"use client"
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Box, Image, Input, Stack, Button, Text } from "@chakra-ui/react";

interface FormImagePageVisualizerProps {
    newSelection : string | null,
    image: string,
    label: string,
    sections : [] | any
}
export default function FormImagePageVisualizer({newSelection, image, label, sections}:FormImagePageVisualizerProps) {
    const [selectedSection, setSelectedSection] = useState<any>(null);

    //Actualizar Selección 
    useEffect(() => {

        if(!newSelection)
            return

        setSelectedSection(newSelection);
        
    }, [newSelection]);

    return (
        <Flex w={"50%"} p={5} alignItems={"center"} justifyContent={"center"} flexDir={"column"} fontSize={"xl"} gap={2}>
            {label}
            <Box position="relative" width="40vw" height="40vh">
                <Image
                    src={image}
                    alt="Background"
                    width="100%"
                    height="100%"
                   
                    position="absolute"
                />
                {selectedSection && (
                    <Box
                        position="absolute"
                        border="2px solid red"
                        {...sections[selectedSection]}
                    />
                )}
             

                    
                  
                
            </Box>
        </Flex>
    )
}
