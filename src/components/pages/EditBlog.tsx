"use client"
import { ReactNode, useEffect, useState } from 'react';
import NewBlogStepTwo from '../organisms/NewBlogStepTwo';
import { useRouter } from 'next/navigation';
import { obtainToken } from '@/helpers/Cookies';
import axios from 'axios';
import { urlToFileList } from '@/helpers/Images';
import Navbar from '../organisms/Navbar';
import EditBlogForm from '../organisms/EditBlogForm';



interface BlogData {
    id: number;
    title: string;
    blog_image: FileList;
    tags: string[];
    content?: TrustedHTML | any;
}

export default function EditBlog({ blogId }: { blogId: number }) {
    const [blogData, setBlogData] = useState<BlogData>();
    const router = useRouter()

    //Obtener Data del Blog Mediante su id
    useEffect(() => {
        (async () => {
            if (!blogId) {
                router.push("blogs")
                return;
            }
            //se obtiene el token del Usuario
            const token = await obtainToken();

            if (!token) {
                alert("Error al obtener la información");
                return
            }

            //Se realiza la peticion POST a la api para registrar el blog
            await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blog/" + blogId + "/", { headers: { Authorization: "Token " + token.value } })
                .then(async (response) => {
                    if (response.status === 200) {
                        
                        const blogImage: any = await urlToFileList(process.env.NEXT_PUBLIC_API_URL+response.data.blog_image, 'imagen.jpg', 'image/jpeg');
                        const blogTags = response.data.tags.map((tag:{name:String}) => tag.name)
                       
                        const data = {
                            id: response.data.id,
                            title: response.data.title,
                            blog_image: blogImage,
                            content: response.data.content,
                            tags: blogTags,
                        }
                        setBlogData(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al obtener el Blog");
                    router.push("blogs")
                });
        })();
    }, [blogId, router]);

    if (!blogData)
        return

    return (
        <>
            <Navbar/>
            <EditBlogForm data={blogData} />
        </>
    );
}