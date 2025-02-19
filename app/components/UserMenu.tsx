'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserMenuProps } from '/@/types/userMenu'
import { useLocale } from './Locale'

export function UserMenu({ username, avatarUrl }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale("userMenu");
  const handleLogout = () => {
    
    localStorage.clear();
    router.push('/login')
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 p-0 rounded-full">
          <Avatar className="h-8 w-8 p-0">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 panel z-100" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <div className="text-sm font-medium">{username}</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{locale.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

