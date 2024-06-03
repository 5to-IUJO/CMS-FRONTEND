interface Object {
    [key: string]: any;
}
/**
 * Función que Compara si las KEYS (propiedades) en comunes entre los 2 objetos, poseen los mismos valores, devuelve true en caso de que se cumpla la igualdad, sino false
 */
export const equalsObjects = (objetoA: Object | null, objetoB: Object | null) => {

    if (!objetoA || !objetoB)
        return false;

    // Obtener las claves comunes de ambos objetos
    const clavesComunes = Object.keys(objetoA).filter(clave => objetoB.hasOwnProperty(clave));

    // Iterar sobre las claves obtenidas y validar si son iguales
    for (let key of clavesComunes) {
        if (objetoA[key] !== objetoB[key]) {
            return false;
        }
    }

    return true;
}



/**
 * Funcion que recibe la data actual del usuario, y los campos a modificar, y devuelve un objeto con los campos que hayan cambiado
 */
export const obtainValuesModified = (data: Object | null, toModifiedValues: Object | null) => {

    if (!data || !toModifiedValues)
        return null;

    const modifiedData: Object = {}

    // Obtener las claves comunes de ambos objetos
    const clavesComunes = Object.keys(data).filter(clave => toModifiedValues.hasOwnProperty(clave));

    //Recorrer Datos y guardar en modifiedData los que sean diferentes
    // Iterar sobre las claves obtenidas y validar si son iguales
    for (let key of clavesComunes) {
        if (data[key] !== toModifiedValues[key]) {
            modifiedData[key] = toModifiedValues[key];
        }
    }


    return modifiedData;
}