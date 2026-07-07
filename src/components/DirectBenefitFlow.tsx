import { useState } from "react";

type Benefit = {
  title: string;
  text: string;
};

type Props = {
  benefits: readonly Benefit[];
};

const labels = ["Tarjeta", "WhatsApp", "Tarifa", "9,9"];

export default function DirectBenefitFlow({ benefits }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = benefits[activeIndex] ?? benefits[0];

  return (
    <div className="direct-benefit-flow" aria-label="Beneficios de reservar directo">
      <div className="benefit-flow-grid">
        {benefits.map((benefit, index) => (
          <button
            className={`benefit-flow-card ${activeIndex === index ? "is-active" : ""}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onPointerEnter={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
            key={benefit.title}
          >
            <span className="benefit-flow-symbol">{labels[index] ?? index + 1}</span>
            <strong>{benefit.title}</strong>
            <small>{benefit.text}</small>
          </button>
        ))}
      </div>

      {active && (
        <div className="benefit-flow-detail" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <strong>{active.title}</strong>
          <p>{active.text}</p>
        </div>
      )}
    </div>
  );
}
