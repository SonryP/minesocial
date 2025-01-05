import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import { ShareModalProps } from '/@/types/post'
import { useLocale } from './Locale'



export function ShareModal({ isOpen, onClose, postHash }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('');
  const locale = useLocale("share");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/post?pid=${encodeURIComponent(postHash)}`);
  }, [postHash]);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent 
    className="fixed panel inset-4 sm:inset-0 sm:w-[400px] h-40 sm:left-1/2 sm:-translate-x-1/2 md:top-1/2 sm:top-1/16-block sm:-translate-y-1/2 z-50 shadow-lg p-4"
  >
    <DialogHeader>
      <DialogTitle>{locale.shareThisPost}</DialogTitle>
    </DialogHeader>
    <div className="flex items-center space-x-2 mt-4">
      <Input
        readOnly
        value={shareUrl}
        className="flex-1 anvil-textbox"
      />
      <Button size="icon" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  </DialogContent>
</Dialog>

  )
}

