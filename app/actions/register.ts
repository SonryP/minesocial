'use server'

import { cookies } from 'next/headers'

export async function register(formData: FormData): Promise<{ success: boolean, message: string }> {
  const password = formData.get('password') as string
  
  // In a real application, you'd want to hash the password and store it securely
  // This is just a simple example
  if (password && password.length >= 8) {
    // Set a cookie to simulate user registration
    (await
          // Set a cookie to simulate user registration
          cookies()).set('registered', 'true', { maxAge: 60 * 60 * 24 * 7 }) // 1 week
    return { success: true, message: 'Registration successful!' }
  } else {
    return { success: false, message: 'Password must be at least 8 characters long.' }
  }
}

