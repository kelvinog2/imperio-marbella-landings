import { useEffect, useMemo, useState } from "react";

type Benefit = {
  title: string;
  text: string;
};

type Promo = {
  title: string;
  text: string;
};

type LotteryResult = {
  discount: 0 | 5 | 10 | 15;
  code: string;
};

type Props = {
  apartmentName: string;
  bookingUrl: string;
  benefits: Benefit[];
  promo: Promo;
};

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const storageKey = "imperio-promo-global";

function randomToken(length = 7) {
  const values = new Uint32Array(length);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
    return Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
  }
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function drawDiscount(): 0 | 5 | 10 | 15 {
  const roll = Math.random() * 100;
  if (roll < 50) return 10;
  if (roll < 80) return 15;
  if (roll < 95) return 5;
  return 0;
}

function createResult(): LotteryResult {
  const discount = drawDiscount();
  return {
    discount,
    code: `IMP-${discount || "DIR"}-${randomToken()}`
  };
}

export default function DirectBookingInteractive({ apartmentName, bookingUrl, benefits, promo }: Props) {
  const [result, setResult] = useState<LotteryResult | null>(null);
  const hasResult = !!result;
  const hasWon = !!result && result.discount > 0;
  const resultModifier = result ? `has-discount-${result.discount}` : "";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setResult(JSON.parse(stored) as LotteryResult);
    } catch {
      setResult(null);
    }
  }, [storageKey]);

  const whatsappHref = useMemo(() => {
    if (!result) return "#";
    const discountText = hasWon ? `${result.discount}% de descuento` : "sin descuento asignado";
    const message = `Hola, he generado mi codigo promocional unico para ${apartmentName}: ${result.code} (${discountText}). Quiero consultar tarifa directa para Marbella.`;
    return `https://wa.me/34600000000?text=${encodeURIComponent(message)}`;
  }, [apartmentName, hasWon, result]);

  const generate = () => {
    if (result) return;
    const next = createResult();
    setResult(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // The code remains visible even if private browsing blocks persistence.
    }
  };

  return (
    <div className="direct-booking-inner">
      <div className={`promo-lottery ${hasResult ? "has-result" : ""} ${hasWon ? "has-win" : "has-retry"} ${resultModifier}`}>
        <span className="promo-label">Ruleta promocional directa</span>
        <div className="lottery-wheel-shell" aria-hidden="true">
          <span className="lottery-pointer"></span>
          <div className={`lottery-wheel ${hasResult ? "is-stopped" : ""}`}>
            <span className={result?.discount === 5 ? "is-active" : ""}>5%</span>
            <span className={result?.discount === 10 ? "is-active" : ""}>10%</span>
            <span className={result?.discount === 15 ? "is-active" : ""}>15%</span>
            <span className={result?.discount === 0 ? "is-active" : ""}>Tarifa</span>
          </div>
        </div>
        <div className="lottery-display" aria-live="polite">
          {!result && (
            <>
              <strong>Un giro, un código</strong>
              <p>El código queda guardado para todas las páginas de Imperio.</p>
            </>
          )}

          {result && hasWon && (
            <>
              <small>Código desbloqueado</small>
              <strong>{result.discount}% dto.</strong>
              <code>{result.code}</code>
            </>
          )}

          {result && !hasWon && (
            <>
              <small>Código generado</small>
              <strong>Tarifa directa</strong>
              <code>{result.code}</code>
              <p>No se asignó descuento automático, pero puedes pedir tarifa directa con este código.</p>
            </>
          )}
        </div>
      </div>

      <div className="direct-copy">
        <span className="section-kicker">Beneficios de reservar directo</span>
        <h2 id="direct-booking-title">{promo.title}</h2>
        <p>{promo.text}</p>
        <div className="direct-actions">
          <button className="button button-primary" type="button" onClick={generate} disabled={hasResult}>
            {hasResult ? "Código generado" : "Generar código promocional"}
          </button>
          {hasResult ? (
            <a className="button button-outline" href={whatsappHref}>
              Enviar código por WhatsApp
            </a>
          ) : (
            <a className="button button-outline" href={bookingUrl} target="_blank" rel="noreferrer">
              Comparar en Booking.com
            </a>
          )}
        </div>
      </div>

      <div className="benefit-row">
        {benefits.map((benefit) => (
          <article className="benefit-item" key={benefit.title}>
            <span aria-hidden="true"></span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
