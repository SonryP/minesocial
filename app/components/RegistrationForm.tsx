'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { activateUser } from '../actions/activate'
import { useRouter } from 'next/navigation'
import { Registration, RegistrationMessage } from '/@/types/registration'
import { useLocale } from './Locale'

export default function RegistrationForm({username}:Registration) {
  const [password, setPassword] = useState('')  
  const [digits, set4Digits] = useState('')  
  const [state, action, isPending] = useActionState(
    async (_state: RegistrationMessage, formData: FormData) => {
      const pretoken = localStorage.getItem('pretoken');
      const result = await activateUser(pretoken!, formData.get('4digits') as string, username, formData.get('password') as string);
      if (result.success) {
        router.push('/login'); 
      }
      return result;
    },
    { success: true, message: '' } // Initial state
  );

  const locale = useLocale("registration");

  const router = useRouter();



  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle>{locale.registrationTitle}</CardTitle>
        <CardDescription>{locale.registrationDescription}</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="4digits">{locale.fourDigits}</Label>
              <Input 
                id="4digits" 
                name="4digits" 
                type="text" 
                required 
                value={digits}
                onChange={(e) => set4Digits(e.target.value)}
                placeholder="1234"
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="password">{locale.password}</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col mt-4 items-start space-y-4">
          <Button type="submit" className="w-full button" disabled={isPending}>
            {isPending ? locale.registering : locale.register}
          </Button>
          {state.message && (
            <div className={`flex items-center space-x-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
              {state.success ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span>{state.message}</span>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}

