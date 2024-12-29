'use client'
import { Suspense, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { useSearchParams } from 'next/navigation';
import { getPost } from '../actions/posts';
import { Post } from '/@/types/post';

export default function PostPage() {

    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
      const searchParams = useSearchParams();
    
      useEffect(() => {
        const fetchUsername = async () => {
          setIsLoading(true);
          try {
            const pid = searchParams.get('pid');
            if (pid) {
              const post = getPost(pid);
              setPost(await post || null);
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error fetching post:', error);
            setPost(null);
          }
        };
        fetchUsername();
      }, [searchParams]);

  return (
    <main className="bg-block-wool-gray text-white flex min-h-screen flex-col items-center justify-center p-8">
      {isLoading ? (
        <div>Cargando post...</div>
      ) : post ? (
        <Suspense fallback={<div>Cargando...</div>}>
        <PostCard post={post!}/>
      </Suspense>
      ) : (
        <div>No se ha encontrado el post compartido!</div>
      )}
    </main>
  
    )
  }

