import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Car, MapPin, Palmtree, Sparkles } from "lucide-react";

type Review = {
  author: string;
  country: string;
  quote: string;
};

type Props = {
  reviews: Review[];
};

const meta = [
  {
    theme: "Ubicación",
    href: "#ubicacion",
    image: "/assets/apartamento/imperio-15.webp",
    icon: MapPin
  },
  {
    theme: "Parking",
    href: "#ubicacion",
    image: "/assets/apartamento/imperio-16.webp",
    icon: Car
  },
  {
    theme: "Playa",
    href: "#galeria",
    image: "/assets/apartamento/imperio-14.webp",
    icon: Palmtree
  },
  {
    theme: "Detalles",
    href: "#servicios",
    image: "/assets/apartamento/imperio-03.webp",
    icon: Sparkles
  }
];

export default function ReviewProofCards({ reviews }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const sync = () => {
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      setScrollProgress(Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div className="review-proof-grid" ref={wrapRef}>
      {reviews.map((review, index) => {
        const item = meta[index % meta.length];
        const Icon = item.icon;
        const lift = (scrollProgress - 0.5) * (index % 2 === 0 ? -34 : 26);
        const isActive = activeIndex === index;

        return (
          <article
            className={`review-proof-card ${isActive ? "is-active" : ""}`}
            style={{ "--review-y": `${lift}px`, "--review-rotate": `${(index - 1.5) * 1.1}deg` } as CSSProperties}
            onPointerEnter={() => setActiveIndex(index)}
            onPointerLeave={() => setActiveIndex(null)}
            key={`${review.author}-${item.theme}`}
          >
            <a className="review-card-link" href={item.href} aria-label={`Ver ${item.theme.toLowerCase()} mencionado por ${review.author}`}>
              <div className="review-media">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <span className="review-theme">
                  <Icon size={16} aria-hidden="true" />
                  {item.theme}
                </span>
              </div>
              <div className="review-body">
                <span className="review-score">9,8</span>
                <blockquote>“{review.quote}”</blockquote>
                <footer>
                  <strong>{review.author}</strong>
                  <span>{review.country}</span>
                </footer>
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
}
