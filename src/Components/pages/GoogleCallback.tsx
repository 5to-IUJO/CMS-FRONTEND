"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/helpers/Cookies';

/**
 * Componente que se encarga de recibir la Respuesta de la autentificacion de Google y Validarla
 *
 */
export default function GoogleCallback() {
    const router = useRouter();


    useEffect(() => {
        const handleAuth = async () => {

            //obtener token de acceso de Google
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');

            //Validar Token
            if (!accessToken) {
                alert("Falló en la Autentificación, Intente Nuevamente");
                router.push("/login");
            }

            //Guardar en el Backend los datos del Usuario
            await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/google/', {
                access_token: accessToken,
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        // Guardar el Token
                        await saveToken(response.data.token);
                        router.push("/dashboard");
                    }
                })
                .catch((error) => {
                    alert("Falló en la Autentificación, Intente Nuevamente");
                    router.push("/login");
                })

        };

        handleAuth();
    }, [router]);

    return (
        <div>
            <h1>Authenticating...</h1>
        </div>
    );
}
