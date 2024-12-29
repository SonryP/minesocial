import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import { ShareModalProps } from '/@/types/post'



export function ShareModal({ isOpen, onClose, postHash }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('');

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
      <DialogContent className="panel 
          fixed inset-0 h-20  sm:max-w-md top-1/2 left-1/3 z-50">
        <DialogHeader>
          <DialogTitle>Comparte este post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            readOnly
            value={shareUrl}
            className="flex-1"
          />
          <Button size="icon" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

