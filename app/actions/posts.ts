'use server';

import { Post } from '/@/types/post';

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
