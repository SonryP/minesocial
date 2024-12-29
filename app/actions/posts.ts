'use server';

import { Post, PostHash } from '/@/types/post';

export async function fetchPosts(token: string): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/Post`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function createPost(
  token: string,
  postContent: string,
  image: string | null
): Promise<Post | null> {
  try {
    if(!postContent && image) {
      postContent = ' ';
    }
    const postData = {
      content: postContent,
      imageData: image,
    };

    const response = await fetch(`${process.env.API_URL}/Post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

export async function likePost(postId:number, token:string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.API_URL}/Post/Like?postId=${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to like post');
    }
    return true;
  } catch (error) {
    console.error('Error liking post:', error);
    return false;
  }
  
}


export async function unlikePost(postId:number, token:string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.API_URL}/Post/Unlike?postId=${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to unlike post');
    }
    return true;
  } catch (error) {
    console.error('Error disliking post:', error);
    return false;
  }
  
}

export async function getPost(hash: string): Promise<Post | null> {
  try {
    const postId = encodeURIComponent(decodeURIComponent(hash));
    const response = await fetch(`${process.env.API_URL}/Post/GetPost?postId=${postId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to share post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sharing post:', error);
    return null;
  }
}

export async function sharePost(postId: number, token: string): Promise<PostHash> {
  try {
    const response = await fetch(`${process.env.API_URL}/Post/Share?postId=${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to share post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sharing post:', error);
    return { shareHash: '' };
  }
}

