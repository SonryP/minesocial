'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginCredentials } from '@/types/auth'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLogin(true);
    const result = await login(credentials)
    setMessage(result.message)
    if (result.success && result.token && result.username && result.userId) {
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('username', result.username);
      localStorage.setItem('userId', result.userId);
      router.push('/timeline')
    }
    setIsLogin(false);

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-teal-800 bg-opacity-40">
      <Card className="w-[350px] panel p-4">
        <CardHeader>
          <CardTitle>Inicia Sesión</CardTitle>
          <CardDescription>Ingresa tus datos para comenzar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuario</Label>
                <Input 
                  id="username"
                  className='anvil-textbox placeholder:text-black dark:bg-gray-700 text-white'
                  placeholder="Vegetta777"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mb-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  className='anvil-textbox placeholder:text-black dark:bg-gray-700 text-white' 
                  type="password" 
                  placeholder="******"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full button">
            {isLogin ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
                      Comprobando credenciales...
                    </>
                  ) : (
                    <>
                   Iniciar Sesión </>
                  )}
              
              </Button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

