'use client'

import React, { useState } from 'react'
import { Text } from '@chakra-ui/react';
import { Tiptap } from './TipTap';
import { obtainToken } from '@/helpers/Cookies';
import { obtainUserData } from '@/helpers/Users';
import axios from 'axios';

/**
 * Componente Principal para el Editor de Paginas
 * 
 */
export default function PageEditor() {

    const [content, setContent] = useState<string>("");

    const handleContentChange = (reason: any) => {
        setContent(reason);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        //se obtiene la data del usuario y su token
        const token = await obtainToken();

        if (!token) {
            alert("Error al Registrar el Blog");
            return
        }

        const { data } = await obtainUserData();

        if (!data) {
            alert("Error al Registrar el Blog");
            return
        }

        //Se une la información del Blog
        const blog = {
            title: "Titulo por Defecto",
            content: content,
            user: data.id
        };

        //Se realiza la peticion POST a la api para registrar el blog
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/newBlog", blog, { headers: { Authorization: "Token "+token.value } })
            .then((response) => {
                if (response.status === 201) {
                    alert("Registro Correcto");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Error al Registrar el Blog");
            });
      
    }

    return (
        <form className='max-w-3xl w-full grid place-items-center  mx-auto pt-10 mb-10' onSubmit={async (e) => await handleSubmit(e)}>
            <Text fontSize={"xl"} mb={10}>
                Nuevo Blog
            </Text>

            <Tiptap
                content={content}
                onChange={(newContent: string) => handleContentChange(newContent)}
            />
        </form>
    )
}




