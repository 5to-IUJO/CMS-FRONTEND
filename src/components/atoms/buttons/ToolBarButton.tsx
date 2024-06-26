"use client"
import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'


interface ToolBarButtonProps {
    active: boolean
    Icon:  React.ElementType
    onClick: Function
}

/**
 *Componente para Reutilizar los botones del editor de paginas 
 *
 */
export default function ToolBarButton({Icon,active, onClick}: ToolBarButtonProps) {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            textColor={active ? (colorMode === "light" ? "blue.400" : "skyblue" ) : (colorMode === "light" ? "black" : "white" )}
            border={"1px"}
            borderColor={active ? (colorMode === "light" ? "blue.400" : "skyblue" ) : "transparent"}
            p={2}
            
        >
            
            <Icon className={"w-4 h-4"}/>
        </Button>
    )
}
