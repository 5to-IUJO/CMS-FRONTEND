import React from 'react'
import Navbar from '../organisms/Navbar'
import BlogBody from '../organisms/BlogBody'
import { Footer } from '../organisms/Footer'

export default function ShowBlog({blog}:{blog:number}) {
  return (
    <>
        <Navbar/>
        <BlogBody blogId={blog}/>
        <Footer />
    </>
  )
}
