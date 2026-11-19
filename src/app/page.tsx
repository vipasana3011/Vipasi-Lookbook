import Image from 'next/image';
import { products } from '@/lib/products';
import { SITE_CONFIG } from '@/config/site';

export default function LookbookPage() {
  const whatsappNumber = SITE_CONFIG.whatsappNumber;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1A1D] flex flex-col font-sans selection:bg-[#5E1224] selection:text-white antialiased">
      {/* 1. MINIMAL VIPASI HEADER */}
      <header className="w-full py-8 md:py-12 px-6 flex flex-col items-center justify-center border-b border-[#E4DCD0]/70 bg-[#FAF7F2]">
        <div className="relative h-10 w-32 md:h-12 md:w-40 mb-3">
          <Image
            src="/logo.png"
            alt="VIPASI"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#665457]">
          <span>Lookbook</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
          <span>Jaipur</span>
        </div>
      </header>

      {/* 2. OUTFIT PHOTOGRAPHY SECTION (85-90% VISUAL FOCUS) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full space-y-24 md:space-y-36">
        {products.map((product, pIdx) => {
          const primaryPhoto = product.primaryPhoto || product.photos[0];
          const secondaryPhotos = product.photos.filter((p) => p !== primaryPhoto);
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Hi VIPASI, I would like to know more about ${product.title}.`
          )}`;

          return (
            <article
              key={product.id}
              className="flex flex-col gap-6 md:gap-8 pb-16 md:pb-24 border-b border-[#E4DCD0]/60 last:border-b-0"
            >
              {/* Plate Index & Category */}
              <div className="flex items-center justify-between text-xs text-[#665457] tracking-widest uppercase">
                <span className="font-serif italic text-sm text-[#967A43]">
                  {String(pIdx + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-widest text-[#958386]">
                  {product.category}
                </span>
              </div>

              {/* Dominant Primary Outfit Photograph */}
              <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/3.9] md:aspect-[3/3.8] bg-[#EFE8DC]/30 overflow-hidden border border-[#E4DCD0]">
                {primaryPhoto && (
                  <Image
                    src={primaryPhoto.src}
                    alt={primaryPhoto.alt || product.title}
                    fill
                    priority={pIdx === 0}
                    loading={pIdx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 100vw, 1152px"
                    className="object-cover object-top"
                  />
                )}
              </div>

              {/* Supporting Angle & Detail Photographs */}
              {secondaryPhotos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {secondaryPhotos.map((photo, sIdx) => (
                    <div
                      key={`${photo.filename}-${sIdx}`}
                      className="relative aspect-[3/4.2] bg-[#EFE8DC]/20 overflow-hidden border border-[#E4DCD0]/70"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || `${product.title} - angle`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                      <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider text-white/90 bg-black/50 px-1.5 py-0.5 backdrop-blur-xs">
                        {photo.view}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Minimal Caption: Title, Details & Quiet Action */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-2">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1A1D] tracking-wide font-normal leading-tight">
                    {product.title}
                  </h2>
                  <p className="text-xs text-[#665457] tracking-wider uppercase mt-1">
                    {product.color && <span>{product.color}</span>}
                    {product.fabric && <span> • {product.fabric}</span>}
                    {product.silhouette && <span> • {product.silhouette}</span>}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs pt-1 sm:pt-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5E1224] hover:text-[#420C19] underline underline-offset-4 tracking-wider transition-colors font-medium"
                  >
                    Enquire on WhatsApp &rarr;
                  </a>
                  {product.productUrl && (
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#958386] hover:text-[#5E1224] tracking-wider transition-colors"
                    >
                      View on vipasi.in
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* 3. SIMPLE FOOTER */}
      <footer className="w-full py-16 px-6 mt-12 bg-[#FAF7F2] border-t border-[#E4DCD0] flex flex-col items-center text-center">
        <div className="relative h-10 w-28 mb-4">
          <Image
            src="/logo.png"
            alt="VIPASI"
            fill
            className="object-contain"
          />
        </div>
        <p className="font-serif italic text-base text-[#665457] max-w-md mx-auto mb-6">
          &ldquo;{SITE_CONFIG.tagline}&rdquo;
        </p>

        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-[#5E1224]">
          <a
            href={SITE_CONFIG.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            VIPASI.IN
          </a>
          <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            INSTAGRAM {SITE_CONFIG.instagramHandle}
          </a>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-[#958386] mt-10">
          Jaipur, Rajasthan, India • Lookbook
        </p>
      </footer>
    </div>
  );
}
