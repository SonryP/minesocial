'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { ImageModal } from './ImageModal'
import { PostProp } from '/@/types/post'
import { useLocale } from './Locale'

export default function PostCard(postProp:PostProp) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const post = postProp.post;
  const locale = useLocale("share");

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }
  const convertImage = (image: string) => {
    const binary = atob(image);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array]);
  };

    const postImageUrl = useMemo(() => {
      if (post?.attachment) {
        const blob = convertImage(post.attachment);
        return URL.createObjectURL(blob);
      }
      return null;
    }, [post]);
    

  if (!post?.active) {
    return <div>{locale.postNotFound}</div>
  }

  return (
<div
                  key={post.id}
                  className="achievement-panel dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  {post.user.username} {locale.sharedWithYou}
                  <div className="p-4">
                    
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-4">
                        <img src={`https://crafatar.com/avatars/${post.user.uuid}`} alt="User avatar" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{post.user.username}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDistance(new Date(post.created), new Date(), { addSuffix: true, locale: es })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{post.content}</p>
                    {postImageUrl && (
                      <img
                        src={postImageUrl}
                        alt="Post image"
                        className="rounded-lg max-h-96 w-full object-cover"
                        onClick={() => handleImageClick(postImageUrl)}
                      />
                    )}
                  </div>
                  <div className="flex px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center">
                            <Image width="18" height="18" alt='Like' src="/imgs/icons/heart-full.png" className='mr-2' /> 
                           
                  </button>
                  
                  <>
                      <div className="flex items-start">{post.likes}</div>
                      {post.likesList.map((like) => {
                        return (
                          <div key={like.id} className="flex items-center ml-2">
                            <img src={`https://crafatar.com/avatars/${like.user.uuid}`} alt="User avatar" aria-describedby='userIcon' className="h-5 w-5" />
                          </div>
                        );
                      })}</>
                <a href="/login" className='ml-6'>{locale.createAccountOrLogin}</a>
                </div>
                      <ImageModal 
                        isOpen={!!selectedImage} 
                        onClose={() => setSelectedImage(null)} 
                        imageUrl={selectedImage || undefined}
                      />
                </div>

                
  )
}

