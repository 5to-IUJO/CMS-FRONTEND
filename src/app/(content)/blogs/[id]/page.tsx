import Blogs from '@/components/pages/Blogs'
import ShowBlog from '@/components/pages/ShowBlog'
import React from 'react'

export default function ReadBlog({ params }: { params: { id: number } }) {
  return (
    <ShowBlog blog={params.id}/>
  )
}
