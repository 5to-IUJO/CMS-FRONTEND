import React from 'react'

import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    AlignLeft,
    AlignCenter,
    AlignJustify,
    AlignRight,
    Image,
} from "lucide-react"
import { type Editor } from '@tiptap/react';
import ToolBarButton from '@/components/atoms/buttons/ToolBarButton';
import { Box, Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import { TextSizeButton } from '@/components/atoms/buttons/TextSizeButton';


interface ToolBarProps {
    editor: Editor | null | any;
    content: string | TrustedHTML;
}


/**
 * ToolBar del Editor de Pagina
 * 
 */
export default function ToolBarEditForm({ editor, content }: ToolBarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (!editor)
        return;

    return (


        <Flex flexWrap={"wrap"} px={4} py={3} roundedTop={"md"} justifyContent={"between"} alignItems={"start"} gap={5} w={"full"}  bg={"#"} border='1px' borderColor='cyan.400'>


            <Flex flexWrap={"wrap"} justify={"start"} alignItems={"center"} gap={5} w={"full"}>

             



                <ToolBarButton
                    Icon={Bold}
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />

                <ToolBarButton
                    Icon={Italic}
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolBarButton
                    Icon={Underline}
                    active={editor.isActive("underline")}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <ToolBarButton
                    Icon={Strikethrough}
                    active={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />



                <ToolBarButton
                    Icon={Undo}
                    active={editor.isActive("undo")}
                    onClick={() => editor.chain().focus().undo().run()}
                />
                <ToolBarButton
                    Icon={Redo}
                    active={editor.isActive("redo")}
                    onClick={() => editor.chain().focus().redo().run()}
                />



              
            </Flex>

          
        </Flex>
    )
}

