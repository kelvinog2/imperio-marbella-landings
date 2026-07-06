import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Award, MessageCircle, Sparkles } from "lucide-react";

type Rating = {
  value: number;
  best: number;
  label: string;
  comments: number;
};

type Score = {
  label: string;
  value: string;
};

type TrustPhoto = {
  src: string;
  label: string;
  offset: number;
};

type Props = {
  rating: Rating;
  scores: Score[];
  photos?: TrustPhoto[];
  apartmentName?: string;
};

const defaultPhotos: TrustPhoto[] = [
  {
    src: "/assets/apartamento/imperio-14.webp",
    label: "Terraza cerrada",
    offset: -24
  },
  {
    src: "/assets/apartamento/imperio-12.webp",
    label: "Salón completo",
    offset: 18
  },
  {
    src: "/assets/apartamento/imperio-08.webp",
    label: "Dormitorio listo",
    offset: -10
  }
];

function parseScore(value: string) {
  return Number(value.replace(",", "."));
}

export default function TrustScoreShowcase({ rating, scores, photos = defaultPhotos, apartmentName = "IMPERIO" }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const next = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1);
      setProgress(next);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const normalized = useMemo(
    () =>
      scores.map((score) => {
        const numeric = parseScore(score.value);
        return {
          ...score,
          numeric,
          width: Math.min(100, Math.max(0, (numeric / rating.best) * 100))
        };
      }),
    [rating.best, scores]
  );

  return (
    <section
      className="trust-showcase"
      id="valoracion"
      ref={sectionRef}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="trust-scoreboard">
        <div className="trust-heading">
          <span>Lo que dicen nuestros huéspedes</span>
          <h2>Valoraciones que explican la reserva</h2>
          <p>
            {apartmentName} combina puntuación excepcional, ubicación muy alta y comentarios que repiten limpieza,
            confort y atención.
          </p>
        </div>

        <div className="trust-rating-pill">
          <span>{rating.value.toString().replace(".", ",")}</span>
          <strong>{rating.label}</strong>
          <small>{rating.comments} comentarios verificados</small>
        </div>

        <div className="score-bars" role="group" aria-label="Puntuaciones del alojamiento">
          {normalized.map((score, index) => (
            <div className="score-bar-row" style={{ "--bar-width": `${score.width}%`, "--bar-delay": `${index * 70}ms` } as CSSProperties} key={score.label}>
              <div className="score-bar-head">
                <span>{score.label}</span>
                <strong>{score.value}</strong>
              </div>
              <span className="score-bar-track">
                <span className="score-bar-fill"></span>
              </span>
            </div>
          ))}
        </div>

        <div className="trust-proof-strip">
          {normalized.slice(0, 2).map((score, index) => {
            const Icon = index === 0 ? Award : Sparkles;
            return (
              <span key={score.label}>
                <Icon size={16} aria-hidden="true" />
                {score.label} {score.value}/10
              </span>
            );
          })}
          <span>
            <MessageCircle size={16} aria-hidden="true" />
            {rating.comments} comentarios
          </span>
        </div>
      </div>

      <div className="trust-photo-stage" role="group" aria-label="Fotos destacadas del apartamento">
        {photos.map((photo, index) => {
          const depth = index + 1;
          const y = photo.offset + (progress - 0.5) * (index % 2 === 0 ? -42 : 36) + pointer.y * depth * -18;
          const x = pointer.x * depth * 16;
          const rotate = (index - 1) * 2.2 + pointer.x * depth * 1.8;

          return (
            <figure
              className={`trust-photo trust-photo-${index + 1}`}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`
              }}
              key={photo.src}
            >
              <img src={photo.src} alt={photo.label} loading="lazy" decoding="async" />
              <figcaption>{photo.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
