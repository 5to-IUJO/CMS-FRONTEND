import { useToast } from '@chakra-ui/react';

interface NotificationData {
    id:string
    title: string;
    status: "info" | "warning" | "success" | "error" | "loading" 
    description: string;
}

//Hook para manejar las Tags en el formulario de los blogs
export const useNotification = () => {
    const toast = useToast()

    const notification = ( data: NotificationData) =>{
        if (!toast.isActive(data.id)) {
            toast({
                id: data.id,
                status: data.status,
                title: data.title,
                description: data.description,
                position: "top",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    return { notification };
}