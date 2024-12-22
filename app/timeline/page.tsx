'use client';

import { useEffect, useMemo, useState } from 'react';
import { ImagePlus, Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { Post } from '/@/types/post';
import { UserMenu } from '../components/UserMenu';
import { createPost, fetchPosts, likePost, unlikePost } from '../actions/posts';
import { ImageModal } from '../components/ImageModal';
import { PostSkeleton } from '../components/PostSkelleton';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Asegura que se renderice solo en el cliente

export default function Timeline() {
  const [newImage, setNewImage] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true)


  const avatar = "https://crafatar.com/avatars/"+userId;

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    if (!token) {
      router.push('/login');
    } else {
      setUsername(storedUsername);
      setUserId(storedUserId);
      fetchPosts(token)
      .then((data) => {setPosts(data); console.log(data); setIsLoading(false); })
      .catch((error) => console.error(error));
      
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (token) {
      if (newPost === "" && !newImage) {
        alert("Por favor, escribe algo o adjunta imagen antes de postear");
        return;
      }

      setIsPosting(true);
      const newPostData = await createPost(token, newPost, newImage);
      if (newPostData!) {
        setPosts((prevPosts) => [newPostData, ...prevPosts]);
      }
      setNewPost('');
      setNewImage(null);
      setIsPosting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = (image: string) => {
    const binary = atob(image);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array]);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const postImageUrls = useMemo(() => {
    return posts.map((post) => {
      if (post.attachment) {
        const blob = convertImage(post.attachment);
        return { id: post.id, url: URL.createObjectURL(blob) };
      }
      return { id: post.id, url: null };
    });
  }, [posts]);

  useEffect(() => {
    return () => {
      postImageUrls.forEach(({ url }) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [postImageUrls]);

  const handleLikeClick = async (postId: number, currentStatus: boolean) => {
    const token = localStorage.getItem('authToken');
    if (!token) return; // Prevent actions without a valid token

    try {
      let success = false;
      setIsPosting(true);
      if (currentStatus) {
        // If post is liked, call unlikePost
        success = await unlikePost(postId, token);
      } else {
        // If post is not liked, call likePost
        success = await likePost(postId, token);
      }

      if (success) {
        setIsPosting(false);
        // Update the likes state if the API call was successful
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likedByUser: !currentStatus, // Toggle the like status
                  likes: currentStatus ? post.likes - 1 : post.likes + 1, // Increment or decrement likes count
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black bg-opacity-50">
<header className="fixed top-0 left-0 right-0 bg-black shadow-sm z-10">
  {/* Dirt background */}
  <div className="absolute inset-0 bg-block-grass-side opacity-40 z-0"></div>

  {/* Lighter gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-gray/50 to-white mix-blend-overlay z-0"></div>


  {/* Content */}
  <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center h-12">

    <h1 className="text-2xl font-bold text-white dark:text-white">PicosPost</h1>
    <UserMenu username={username!} avatarUrl={avatar} />

  </div>

 
</header>




      <main className="flex-grow max-w-2xl w-full mx-auto flex flex-col mt-14"> {/* Added top margin to account for fixed header */}
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-4 pb-44"> {/* Kept bottom padding for fixed create post area */}
          {posts.map((post) => {
              const imageUrl = postImageUrls.find((img) => img.id === post.id)?.url;
              return (
                <div
                  key={post.id}
                  className="book dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
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
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Post image"
                        className="rounded-lg max-h-96 w-full object-cover"
                        onClick={() => handleImageClick(imageUrl)}
                      />
                    )}
                  </div>
                  <div className="flex justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center" onClick={() => handleLikeClick(post.id, post.likedByUser)} disabled={isPosting}>
                   {post.likedByUser? <Image width="18" height="18" alt='Like' src="/imgs/icons/heart-full.png" className='mr-2' />: <Image width="18" height="18" alt='Like' src="/imgs/icons/heart-empty.png" className='mr-2' />}
                   {post.likes}
                  </button>
                  {/* <button className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" /> {post.}
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center">
                    <Share2 className="mr-2 h-4 w-4" /> {post.shares}
                  </button> */}
                </div>
                </div>
              );
            })}
            {isLoading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}
          </div>
        </ScrollArea>

        <div className="fixed bottom-0 panel left-0 right-0 dark:bg-gray-800 shadow-lg z-10">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <textarea
                  placeholder="Que sucede?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full anvil-textbox p-2 bg-gray-50 placeholder:text-black dark:bg-gray-700 text-white dark:text-black rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  disabled={isPosting}
                />
                {newImage && (
                  <img src={newImage} alt="Uploaded preview" className="mt-2 rounded-lg max-h-40 object-cover" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={isPosting}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <ImagePlus className="inline-block mr-2 h-4 w-4" /> Adjunta captura!
                  </button>
                </div>
                <button type="submit" disabled={isPosting} className="px-4 py-2 button bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  

                  {isPosting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
                      Posteando...
                    </>
                  ) : (
                    <>
                   <Send className="inline-block mr-2 h-4 w-4" /> Postear </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageUrl={selectedImage || undefined}
      />
    </div>
  )
}

