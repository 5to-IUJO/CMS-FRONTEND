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
import ToolBarButton from '../atoms/buttons/ToolBarButton';
import { Box, Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import AddImage from '../organisms/modals/AddImage';
import ColorPickerButton from '../atoms/buttons/ColorPickerButton';
import { TextSizeButton } from '../atoms/buttons/TextSizeButton';


interface ToolBarProps {
    editor: Editor | null | any;
    content: string | TrustedHTML;
}


/**
 * ToolBar del Editor de Pagina
 * 
 */
export default function ToolBar({ editor, content }: ToolBarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (!editor)
        return;

    return (


        <Flex flexWrap={"wrap"} px={4} py={3} justifyContent={"between"} alignItems={"start"} gap={5} w={"full"} bg={"darkBlue.400"} border='1px' borderColor='gray.700'>


            <Flex flexWrap={"wrap"} justify={"start"} alignItems={"center"} gap={5} w={{ base: "full", lg: "83%" }}>





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
                <ToolBarButton
                    Icon={Image}
                    active={editor.isActive("asd")}
                    onClick={onOpen}
                />

                <ToolBarButton
                    Icon={AlignLeft}
                    active={editor.isActive({ textAlign: "left" })}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                />

                <ToolBarButton
                    Icon={AlignCenter}
                    active={editor.isActive({ textAlign: "center" })}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                />
                <ToolBarButton
                    Icon={AlignJustify}
                    active={editor.isActive({ textAlign: "justify" })}
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                />
                <ToolBarButton
                    Icon={AlignRight}
                    active={editor.isActive({ textAlign: "right" })}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                />



                <AddImage isOpen={isOpen} onClose={onClose} setImage={(url: string) => editor?.chain().focus().setImage({ src: url }).run()} />
            </Flex>


        </Flex>
    )
}


/*
                <TextSizeButton
                    setSize={(size: string) => editor.chain().focus().setFontSize(size).run()}
                />
                <ColorPickerButton
                    onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                />

                <ToolBarButton
                    Icon={List}
                    active={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolBarButton
                    Icon={ListOrdered}
                    active={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                />
                <ToolBarButton
                    Icon={Quote}
                    active={editor.isActive("blockquote")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                />

*/