import React from 'react'
import Navbar from '../organisms/Navbar'
import ShowBlogs from '../organisms/ShowBlogs'
import BlogBody from '../organisms/BlogBody'

export default function ShowBlog({blog}:{blog:number}) {
  return (
    <>
        <Navbar/>
        <BlogBody blogId={blog}/>
    </>
  )
}
