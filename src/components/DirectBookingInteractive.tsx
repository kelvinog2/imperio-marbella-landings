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
  if (roll < 40) return 10;
  if (roll < 65) return 15;
  if (roll < 80) return 5;
  return 0;
}

function createResult(apartmentName: string): LotteryResult {
  const discount = drawDiscount();
  const normalizedName = apartmentName.replace(/\D/g, "") || "VIP";
  return {
    discount,
    code: `IMP${normalizedName}-${discount || "ND"}-${randomToken()}`
  };
}

export default function DirectBookingInteractive({ apartmentName, bookingUrl, benefits, promo }: Props) {
  const storageKey = `imperio-promo-${apartmentName.toLowerCase().replace(/\s+/g, "-")}`;
  const [result, setResult] = useState<LotteryResult | null>(null);
  const hasResult = !!result;
  const hasWon = !!result && result.discount > 0;

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
    const next = createResult(apartmentName);
    setResult(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // The code remains visible even if private browsing blocks persistence.
    }
  };

  return (
    <div className="direct-booking-inner">
      <div className={`promo-lottery ${hasResult ? "has-result" : ""} ${hasWon ? "has-win" : "has-retry"}`}>
        <span className="promo-label">Ruleta promocional directa</span>
        <div className={`lottery-wheel ${hasResult ? "is-stopped" : ""}`} aria-hidden="true">
          <span>5%</span>
          <span>10%</span>
          <span>15%</span>
        </div>
        <div className="lottery-display" aria-live="polite">
          {!result && (
            <>
              <strong>Un giro, un codigo</strong>
              <p>Genera un codigo unico para solicitar una tarifa directa por WhatsApp.</p>
            </>
          )}

          {result && hasWon && (
            <>
              <small>Codigo desbloqueado</small>
              <strong>{result.discount}% dto.</strong>
              <code>{result.code}</code>
            </>
          )}

          {result && !hasWon && (
            <>
              <small>Codigo generado</small>
              <strong>Tarifa directa</strong>
              <code>{result.code}</code>
              <p>No se asigno descuento automatico, pero puedes pedir tarifa directa con este codigo.</p>
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
            {hasResult ? "Codigo generado" : "Generar codigo promocional"}
          </button>
          {hasResult ? (
            <a className="button button-outline" href={whatsappHref}>
              Enviar codigo por WhatsApp
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
