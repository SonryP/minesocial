'use client'
import { Suspense, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { useSearchParams } from 'next/navigation'
import { getPost } from '../actions/posts'
import { Post } from '/@/types/post'

function PostContent() {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const pid = searchParams.get('pid')
        if (pid) {
          const fetchedPost = await getPost(pid)
          setPost(fetchedPost || null)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [searchParams])

  if (isLoading) {
    return <div>Cargando post...</div>
  }

  if (!post) {
    return <div>No se ha encontrado el post compartido!</div>
  }

  return <PostCard post={post!} />
}

export default function PostPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <main className="bg-block-wool-gray text-white flex min-h-screen flex-col items-center justify-center p-8">
        <PostContent />
      </main>
    </Suspense>
  )
}
