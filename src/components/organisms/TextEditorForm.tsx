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
import ToolBarCreateDescription from '../molecules/ToolBarCreateDescription';
import ToolBarEditProfile from '../molecules/profiledit/ToolBarEditProfile';
import ToolBarEditForm from '../molecules/ToolBarEditForm';
/**
 * Componente para poder utilizar la libreria de TipTap con un editor de texto
 * 
 */
export const TextEditorForm = ({ onChange, content, setSelection }: {onChange: Function, content:string | TrustedHTML, setSelection: (arg0: string | null) => void }) => {
  
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
                    `flex break-all flex-col px-4 py-3 border-b border-l border-r border-[#1F93A5] min-h-[40vh]  w-full max-w-full   gap-3 font-medium text-[16px] pt-4 outline-none `,
            }
        },
        onUpdate:({editor}) => {
            handleChange(editor.getHTML());
        },
        onFocus:({editor,event})=>{
            setSelection("description")
        },
        content:content
    })

    return (

        <Box  w={"90%"} maxW={{base:"90%"}} >
            
            <ToolBarEditForm editor={editor} content={content}/>
            <EditorContent style={{whiteSpace:"pre-line"}} editor={editor} />
        </Box>

    )
}

