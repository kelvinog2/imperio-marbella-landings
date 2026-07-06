import { useMemo, useRef, useState } from "react";
import { interestPoints, locationApartments } from "@/data/landings";

type InterestPoint = (typeof interestPoints)[number] & { kind: "interest" };
type ApartmentPoint = (typeof locationApartments)[number] & { kind: "apartment" };
type LocationPoint = InterestPoint | ApartmentPoint;

const allPoints: LocationPoint[] = [
  ...locationApartments.map((point) => ({ ...point, kind: "apartment" as const })),
  ...interestPoints.map((point) => ({ ...point, kind: "interest" as const }))
];

export default function LocationExplorer() {
  const [activeId, setActiveId] = useState(allPoints[0].id);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const detailRef = useRef<HTMLElement | null>(null);

  const activePoint = useMemo(
    () => allPoints.find((point) => point.id === activeId) ?? allPoints[0],
    [activeId]
  );
  const bubbleLeft = `clamp(152px, ${activePoint.x}%, calc(100% - 152px))`;
  const bubblePlacement = activePoint.y < 36 ? "is-below" : "is-above";

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    setPointer({ x, y });
  };

  const activatePoint = (id: string, revealDetail = false) => {
    setActiveId(id);
    if (revealDetail && window.matchMedia("(max-width: 720px)").matches) {
      window.setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 40);
    }
  };

  return (
    <section className="location-explorer" id="ubicacion-general" aria-labelledby="location-explorer-title">
      <div className="main-section-heading">
        <span>Ubicación general</span>
        <h2 id="location-explorer-title">Todo lo importante queda cerca</h2>
        <p>
          Los apartamentos se sitúan entre el centro histórico, Playa de Venus, el paseo marítimo
          y el puerto deportivo de Marbella.
        </p>
      </div>

      <div className="location-explorer-grid">
        <div className="location-frame" onPointerMove={onPointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
          <div className="location-map-surface">
            <picture>
              <source srcSet="/assets/main/ubicaciones-interes-sm.webp" media="(max-width: 640px)" />
              <img
                src="/assets/main/ubicaciones-interes.webp"
                alt="Mapa aéreo de Marbella con Apartamentos Imperio y puntos de interés turístico cercanos"
                width="1800"
                height="1013"
                loading="lazy"
                decoding="async"
              />
            </picture>

            <div className="location-hotspots" role="group" aria-label="Puntos de interés en el mapa">
              {allPoints.map((point) => (
                <button
                  key={point.id}
                  className={`location-pin location-pin-${point.kind} ${activeId === point.id ? "is-active" : ""}`}
                  type="button"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  aria-label={`Ver ${point.name}`}
                  onClick={() => activatePoint(point.id, true)}
                  onFocus={() => activatePoint(point.id)}
                  onMouseEnter={() => activatePoint(point.id)}
                >
                  <span>{point.kind === "interest" ? point.number : "I"}</span>
                </button>
              ))}

              <article
                className={`location-bubble location-bubble-${activePoint.kind} ${bubblePlacement}`}
                style={
                  {
                    left: bubbleLeft,
                    top: `${activePoint.y}%`,
                    "--float-x": `${pointer.x}px`,
                    "--float-y": `${pointer.y}px`
                  } as React.CSSProperties
                }
                aria-live="polite"
              >
                <span>{activePoint.kind === "interest" ? `Punto ${activePoint.number}` : activePoint.type}</span>
                <h3>{activePoint.name}</h3>
                <p>{activePoint.description}</p>
                <em>{activePoint.kind === "interest" ? activePoint.time : activePoint.detail}</em>
              </article>
            </div>
          </div>
        </div>

        <aside className="location-detail-panel" ref={detailRef}>
          <div className="location-detail-copy">
            <span>{activePoint.kind === "interest" ? `Punto ${activePoint.number}` : activePoint.type}</span>
            <h3>{activePoint.name}</h3>
            <p>{activePoint.description}</p>
            <strong>{activePoint.kind === "interest" ? activePoint.time : activePoint.detail}</strong>
          </div>

          <div className="location-chip-strip" role="group" aria-label="Elegir punto de interés">
            {allPoints.map((point) => (
              <button
                key={point.id}
                className={activeId === point.id ? "is-active" : ""}
                type="button"
                onClick={() => activatePoint(point.id)}
              >
                {point.kind === "interest" ? `${point.number}. ${point.name}` : point.name}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
