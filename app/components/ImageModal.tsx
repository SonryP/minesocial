import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl?: string
}

export function ImageModal({ isOpen, onClose, imageUrl }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="
          achievement-panel 
          fixed inset-0 
          flex items-center justify-center 
          bg-black/70 
          p-2
          z-50
        "
        aria-description="Full size image"
        aria-describedby="full-size-image"
        onClick={onClose} 
      >
        <div className="relative max-w-[96vw] max-h-[96vh] bg-white rounded-md overflow-hidden">
          
          <DialogTitle className="text-center mb-2"></DialogTitle>
          <DialogDescription id="full-size-image" className="hidden">Full size image</DialogDescription>

          {imageUrl && (
            <Image
              width="0"
              height="0"
              src={imageUrl} 
              alt="Full size image" 
              className="w-full h-full object-contain pointer-events-none"
            />
          )}

          {/* Explicitly hide default close button */}
          <DialogClose asChild>
            <span className="hidden" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
