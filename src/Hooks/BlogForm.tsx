import { useEffect, useRef, useState } from 'react';

interface FormInputs {
    title: string;
    blog_image: FileList;
    tags: string[];
    content?: TrustedHTML | any;
}

//Hook para manejar las Tags en el formulario de los blogs
export const useBlogForm = (setValue: Function,refInput: HTMLInputElement | any, initialData?: FormInputs) => {
 
    const [content, setContent] = useState(initialData ? initialData.content : '');
    const [tags, setTags] = useState<string[]>(initialData?.tags ? initialData.tags : [""]);
    const [sizeInput, setSizeInput] = useState(() => 1);
  

    useEffect(() => {
        if (!initialData) return;
            setValue('title', initialData.title);
            setValue('blog_image', initialData.blog_image);
    }, [initialData, setValue]);

    useEffect(() => {
        refInput.current?.focus();

        function handleKeyUp(event: KeyboardEvent) {
            if (!refInput.current) return;
            const newText = refInput.current.value.trim().replace(',', '');

            switch (event.key) {
                case ',':
                case 'Enter':
                    if (newText.length > 0) {
                        setTags((prevTags) => [...prevTags, newText]);
                        refInput.current.value = '';
                    }
                    break;
                case 'Backspace':
                    if (tags.length > 0 && newText.length === 0) {
                        setTags((prevTags) => {
                            const updatedTags = [...prevTags];
                            updatedTags.pop();
                            return updatedTags;
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [tags]);

  
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim().length > 0) {
            // Actualizar el tamaño del input para etiquetas
        } else if (refInput.current) {
            refInput.current.value = '';
        }
    };

    const handleDelItem = (index: number) => {
        setTags((prevTags) => {
            const updatedTags = [...prevTags];
            updatedTags.splice(index, 1);
            return updatedTags;
        });
    };

    return { tags, sizeInput,   handleChangeInput, handleDelItem, content, setContent };
};