"use client"
import { useState } from 'react';
import axios from 'axios';
import { Input } from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';

export const PasswordRecoverPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/password-reset/', { email });
        } catch (error) {
            console.log(error)
        }
        setMessage("Se ha enviado un enlace de recuperación al Correo Ingresado")
    };

    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Enviar solicitud de restablecimiento</button>
            {message && <p>{message}</p>}
        </form>
        
        </>
    );
};

