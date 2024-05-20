"use client"
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from '../molecules/ToolBar';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import FontSize from '@/extensions/TipTap/fontSize';
import { Box } from '@chakra-ui/react';
/**
 * Componente para poder utilizar la libreria de TipTap con un editor de texto
 * 
 */
export const Tiptap = ({ onChange, content }: {onChange: Function, content:string}) => {

    const handleChange = (newContent: string) =>{
        onChange(newContent);
    };

    const editor = useEditor({
        extensions: [
            StarterKit,Underline, Image, ImageResize,TextAlign.configure({
                types: ['heading', 'paragraph'],
              }), Color, TextStyle, Typography,  
              FontSize.configure({
                types: ['textStyle'],
              }),
        ],
        editorProps: {
            attributes: {
                class:
                    `flex break-all flex-col px-4 py-3 border-b border-l border-r border-gray-700  w-full max-w-full  min-h-[50vh] gap-3 font-medium text-[16px] pt-4 rounded-b-md outline-none `,
            }
        },
        onUpdate:({editor}) => {
            handleChange(editor.getHTML());
        },
    })

    return (

        <Box  w={"full"} maxW={{base:"full",md:"60vw", xl:"50vw", "2xl":"40vw"}} px={4}>

            <ToolBar editor={editor} content={content}/>
            <EditorContent style={{whiteSpace:"pre-line"}}  editor={editor} />
        </Box>

    )
}

