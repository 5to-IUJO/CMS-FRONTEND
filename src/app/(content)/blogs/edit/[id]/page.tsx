import Blogs from '@/components/pages/Blogs'
import EditBlog from '@/components/pages/EditBlog'
import ShowBlog from '@/components/pages/ShowBlog'
import React from 'react'

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <EditBlog blogId={params.id}/>
  )
}
