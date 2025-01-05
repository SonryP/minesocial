'use client'
import { Suspense, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { useSearchParams } from 'next/navigation'
import { getPost } from '../actions/posts'
import { Post } from '/@/types/post'
import { useLocale } from '../components/Locale'

function PostContent() {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const locale = useLocale("share")

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
    return <div>{locale.loadingPost}</div>
  }

  if (!post) {
    return <div>{locale.postNotFound}</div>
  }

  return <PostCard post={post!} />
}

export default function PostPage() {
  return (
    <Suspense fallback={<div>...</div>}>
      <main className="bg-block-wool-gray text-white flex min-h-screen flex-col items-center justify-center p-8">
        <PostContent />
      </main>
    </Suspense>
  )
}


