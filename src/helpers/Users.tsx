import axios from "axios";
import { obtainToken } from "./Cookies";


export async function obtainUserData() {

    //Obtener Token y Verificar que exista
    const token = await obtainToken()
    if (!token)
        return { resp: false, message: "Error con el Inicio de Sesión" }

    //Peticion GET a la Api para Verificar el acceso a los datos del usuario, es necesario adjuntar en los Headers el token
    await axios.get(process.env.NEXT_PUBLIC_API_URL + "profile", { headers: { Authorization: "Token " + token.value } })
        .then(async (response) => {
            if (response.status === 200) 
                return { resp: true, message: "Autorizado", data: response.data }
            
        }).catch((error) => {
            console.log(error)
        })

    return { resp: false, message: "Error, No Autorizado" }

}