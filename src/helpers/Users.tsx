
import { obtainToken } from "./Cookies";

/**
 * Funcion que Retorna la data del Usuario segun el token almacenado
 * @returns 
 */
export async function obtainUserData() {

    //Obtener Token y Verificar que exista
    const token = await obtainToken()
    
    if (!token)
        return { resp: false, message: "Error con el Inicio de Sesión", data: {} }

    //Peticion GET a la Api para Verificar el acceso a los datos del usuario, es necesario adjuntar en los Headers el token
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
            method: "GET",
            headers: {
                Authorization: "Token " + token.value
            }
        });
        if (response.ok) {
            const data = await response.json();;
            return { resp: true, message: "Autorizado", data };

        }
        else {
            console.log("Error en la solicitud:", response.status);
            return { resp: false, message: "Error, No Autorizado", data: {} };
        }
    } catch (error) {
        console.log("Error en la solicitud:", error);
        return { resp: false, message: "Error, No Autorizado", data: {} };
    }


}


export async function isUserLoggin(){

    //Obtener Token y Verificar que exista
    const token = await obtainToken()
    if (!token)
        return false

    return true;
    
}

export async function isUserEmailVerified(){
    //obtener datos del usuario
    const data = await obtainUserData();
    console.log(data);
    return data.data.email_verified
}