"use client"
import { useState } from 'react';

import axios from 'axios';
import { Input } from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';

export const ChangePasswordPage = () => {
    const router = useRouter();

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const uid = searchParams.get('uid')
    
    if(!uid || !token)
        router.push("/login")
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+`/password-reset-confirm/${uid}/${token}/`, { new_password: newPassword });
            setMessage(response.data.message);
            router.push("/login");
        } catch (error) {
            setMessage('Error al restablecer la contraseña.');
        }
    };

    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <label>Nueva Contraseña:</label>
            <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Restablecer Contraseña</button>
            {message && <p>{message}</p>}
        </form>
        
        </>
    );
};
