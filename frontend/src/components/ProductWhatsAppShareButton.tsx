"use client";

import { useState } from "react";
import { Loader2, MessageCircle, Share2 } from "lucide-react";

type ProductWhatsAppShareButtonProps = {
  title: string;
  shareText: string;
  shareUrl: string;
  imageUrl?: string;
};

function buildWhatsAppFallbackUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function ProductWhatsAppShareButton({
  title,
  shareText,
  shareUrl,
  imageUrl
}: ProductWhatsAppShareButtonProps) {
  const [busy, setBusy] = useState(false);

  const fallbackMessage = [
    shareText,
    `Link: ${shareUrl}`,
    imageUrl ? `Image: ${imageUrl}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const onClick = async () => {
    if (busy) return;
    setBusy(true);

    try {
      if (imageUrl && typeof window !== "undefined" && "share" in navigator) {
        try {
          const response = await fetch(imageUrl, { mode: "cors" });
          const blob = await response.blob();
          const fileName = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "product"}.jpg`;
          const file = new File([blob], fileName, { type: blob.type || "image/jpeg" });
          const shareData: ShareData & { files?: File[] } = {
            title,
            text: `${shareText}\nLink: ${shareUrl}`,
            files: [file]
          };

          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share(shareData);
            return;
          }
        } catch {
          // Fallback below.
        }
      }

      window.open(buildWhatsAppFallbackUrl(fallbackMessage), "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      disabled={busy}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-charcoal transition hover:bg-gold/10 disabled:cursor-wait disabled:opacity-60"
      aria-label="Share product"
      title="Share product"
    >
      {busy ? (
        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      ) : (
        <Share2 size={16} aria-hidden="true" />
      )}
    </button>
  );
}
