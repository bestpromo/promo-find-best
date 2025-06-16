
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  shareUrl: string;
}

export const ShareModal = ({ isOpen, onClose, productName, shareUrl }: ShareModalProps) => {
  const handleWhatsAppShare = () => {
    const message = `Olha essa oferta incrível que encontrei: ${productName} - ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
    onClose();
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have direct URL sharing, so we copy to clipboard
    navigator.clipboard.writeText(`${productName} - ${shareUrl}`);
    alert('Link copiado! Cole no Instagram para compartilhar.');
    onClose();
  };

  const handleEmailShare = () => {
    const subject = `Confira esta oferta: ${productName}`;
    const body = `Olá!\n\nEncontrei esta oferta incrível e queria compartilhar com você:\n\n${productName}\n\n${shareUrl}\n\nEspero que seja útil!`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Produto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Como você gostaria de compartilhar este produto?
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <MessageCircle className="h-5 w-5 text-green-600" />
              WhatsApp
            </Button>
            
            <Button
              onClick={handleFacebookShare}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook
            </Button>
            
            <Button
              onClick={handleInstagramShare}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
              Instagram
            </Button>
            
            <Button
              onClick={handleEmailShare}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <Mail className="h-5 w-5 text-gray-600" />
              E-mail
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
