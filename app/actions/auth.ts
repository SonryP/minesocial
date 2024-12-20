'use server'

import { LoginCredentials, LoginResult } from '@/types/auth';

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
    const fetchData = async () => {
        const data = await fetch(process.env.API_URL +'/Login', { cache: 'no-store',
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username:credentials.username, password:credentials.password})
         });
        const response = await data.json();
        return response;
    };
    const data = await fetchData();
    let isValid = false;
    if(data.status) isValid = false;
    if(data.token) {
        isValid = true;
    }

  if (isValid) {
    return { success: true, message: 'Inicio correcto, redireccionando...', token: data.token, username: data.username, userId: data.userId };
  } else {
    return { success: false, message: 'Revisa los datos ingresados' };
  }
}