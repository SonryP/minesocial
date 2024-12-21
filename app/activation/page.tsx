'use client'
import { useSearchParams } from 'next/navigation'
import RegistrationForm from '../components/RegistrationForm'
import { getUser } from '../actions/activate'
import { Suspense, useEffect, useState } from 'react'

export default function Activation() {
  const [username, setUsername] = useState<string | null>(null);
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchUsername = async () => {
      const aid = searchParams.get('aid');
      
      if (aid) {
        const name = await getUser(aid);
        setUsername(name);
        localStorage.setItem('pretoken', aid);
      }
    };
    fetchUsername();
  }, []);

  return (
   <Suspense>
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black bg-opacity-50">
      { username == null ?  <h1 className="text-4xl text-white font-bold mb-8">Cargando...</h1>
      :username == "" ? <h1 className="text-4xl text-white font-bold mb-8">Usuario ya activado!</h1>:
      <>
      <h1 className="text-4xl text-white font-bold mb-8">Bienvenido, {username}!</h1>
      <RegistrationForm username={username} />
    </>
      }
    </main>
    </Suspense>
  )
}

