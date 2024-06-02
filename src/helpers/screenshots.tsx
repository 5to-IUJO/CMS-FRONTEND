import axios from "axios";

//Funcion que Realiza la capture de pantalla de una WEB 
export async function takeScreenshot(url: string) {
    if (url.startsWith("https://")) {
        const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.NEXT_PUBLIC_APIFLASH_KEY}&wait_until=page_loaded&url=${url}`

        try {
            const response = await axios.get(apiUrl, { responseType: "blob" })

            if (response.status === 200) {
                //blob para preview
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);

                //file para submit
                const fileExtension = response.data.type.split('/')[1];
                const imageFile = new File([blob], `UploadImage.${fileExtension}`, { type: blob.type });

                return {imageFile: imageFile, imageUrl:imageUrl}
            }
        } catch (error) {
            console.log(error);
            return false
        }



    }
}