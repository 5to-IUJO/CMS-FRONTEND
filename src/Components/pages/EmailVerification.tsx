"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
export default function EmailVerification() {

    const [verified, setVerified] = useState(false);
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const token = searchParams.get('token')
        if (token) 
        {
            //Se valida el token en el backend
            axios.get(process.env.NEXT_PUBLIC_API_URL+"/verify-email/"+token)
                .then(response => {
                    if (response.data.verified) {
                        setVerified(true);
                    }
                    else {
                        setError('Error al verificar el correo electrónico.');
                    }
                })
                .catch(error => {
                    console.log(error);
                    setError('Error al verificar el correo electrónico.');
                })
                .finally(() => {

                    setLoading(false);
                });;
        }
        else {
            setLoading(false);
            setError('Token no encontrado en la URL.');
        }
    }, []);

    if (loading) {
      return <p>Verificando correo electrónico...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

  return (
      <div>
          {verified ? (
              <p>¡Tu correo electrónico ha sido verificado correctamente!</p>
          ) : (
              <p>No se pudo verificar tu correo electrónico.</p>
          )}
      </div>
  );
}
