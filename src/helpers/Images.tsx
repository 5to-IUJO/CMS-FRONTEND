
//Funcion que Convierta la imagen de una URL en un archivo
export async function urlToFile(url: string, filename: string, mimeType: string) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    } catch (error) {
        return false
    }
}

//Funcion que guarda la imagen en un FileList (Para luego mandarlos al backend)
export async function urlToFileList(url: string, filename: string, mimeType: string) {
    const file : any = await urlToFile(url, filename, mimeType);
    if(!file)
        return false;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
}