import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { createClient } from "@sanity/client";

type Availability = {
  updatedAt: string;
  occupied: string[];
  minStay: number;
};

type Props = {
  fallback: Availability;
  bookingUrl: string;
  apartmentSlug: string;
};

const weekdays = ["L", "M", "X", "J", "V", "S", "D"];
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const firstWeekday = (first.getDay() + 6) % 7;
  const blanks = Array.from({ length: firstWeekday }, () => null);
  const days = Array.from({ length: daysInMonth(year, month) }, (_, index) => new Date(year, month, index + 1));
  return [...blanks, ...days];
}

export default function AvailabilityCalendar({ fallback, bookingUrl, apartmentSlug }: Props) {
  const [availability, setAvailability] = useState(fallback);
  const [offset, setOffset] = useState(0);
  const [visibleMonths, setVisibleMonths] = useState(3);
  const [direction, setDirection] = useState<0 | -1 | 1>(0);
  const [showTouchControls, setShowTouchControls] = useState(false);
  const touchStart = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
    const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

    if (!projectId) return;

    const client = createClient({
      projectId,
      dataset,
      apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-07-04",
      useCdn: true
    });

    client
      .fetch<Availability | null>(
        `*[_type == "availabilityCalendar" && apartmentSlug == $apartmentSlug][0]{
          updatedAt,
          occupied,
          minStay
        }`,
        { apartmentSlug }
      )
      .then((data) => {
        if (data?.occupied) setAvailability(data);
      })
      .catch(() => {
        setAvailability(fallback);
      });
  }, [apartmentSlug, fallback]);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 740px)");
    const medium = window.matchMedia("(max-width: 980px)");

    const sync = () => {
      const count = small.matches ? 1 : medium.matches ? 2 : 3;
      setVisibleMonths(count);
      setOffset((current) => Math.min(current, 12 - count));
    };

    sync();
    small.addEventListener("change", sync);
    medium.addEventListener("change", sync);

    return () => {
      small.removeEventListener("change", sync);
      medium.removeEventListener("change", sync);
    };
  }, []);

  const occupied = useMemo(() => new Set(availability.occupied), [availability.occupied]);
  const today = useMemo(() => new Date(`${availability.updatedAt}T00:00:00`), [availability.updatedAt]);
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() + index, 1);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        days: buildMonth(date.getFullYear(), date.getMonth())
      };
    });
  }, [today]);
  const maxOffset = Math.max(0, months.length - visibleMonths);
  const visible = months.slice(offset, offset + visibleMonths);

  const revealControls = () => {
    setShowTouchControls(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setShowTouchControls(false), 2200);
  };

  const navigate = (delta: -1 | 1) => {
    setOffset((current) => {
      const next = Math.min(Math.max(current + delta, 0), maxOffset);
      if (next !== current) {
        setDirection(delta);
        window.setTimeout(() => setDirection(0), 260);
      }
      return next;
    });
    revealControls();
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) > 44) navigate(delta < 0 ? 1 : -1);
  };

  return (
    <section className="availability-section" id="disponibilidad">
      <div className="availability-copy">
        <span className="section-kicker">Disponibilidad</span>
        <h2>Elige fechas sin perder el impulso.</h2>
        <p>
          Consulta los próximos meses, revisa los días bloqueados y confirma la reserva en el canal
          oficial con la información fresca.
        </p>
        <a className="button button-primary" href={bookingUrl} target="_blank" rel="noreferrer">
          Reservar ahora
          <ExternalLink size={17} aria-hidden="true" />
        </a>
      </div>

      <div
        className={`calendar-shell ${showTouchControls ? "is-touching" : ""}`}
        role="group"
        aria-label="Calendario de disponibilidad"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
          revealControls();
        }}
        onTouchMove={revealControls}
        onTouchEnd={onTouchEnd}
        onWheel={revealControls}
      >
        <div className="calendar-toolbar">
          <h3>
            <CalendarDays size={24} aria-hidden="true" />
            Fechas orientativas
          </h3>
          <div className="calendar-legend">
            <span><i className="legend-dot"></i>Disponible</span>
            <span><i className="legend-dot occupied"></i>Ocupado</span>
          </div>
        </div>

        <button
          className="calendar-nav calendar-nav-prev"
          type="button"
          aria-label="Meses anteriores"
          disabled={offset === 0}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          className="calendar-nav calendar-nav-next"
          type="button"
          aria-label="Meses siguientes"
          disabled={offset >= maxOffset}
          onClick={() => navigate(1)}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        <div className={`calendar-grid ${direction === 1 ? "is-next" : ""} ${direction === -1 ? "is-prev" : ""}`}>
          {visible.map((item) => (
            <div className="month" key={`${item.year}-${item.month}`}>
              <h4>{monthNames[item.month]} {item.year}</h4>
              <div className="days">
                {weekdays.map((day) => (
                  <span className="day-name" key={day}>{day}</span>
                ))}
                {item.days.map((day, index) => {
                  if (!day) return <span className="day empty" aria-hidden="true" key={`blank-${index}`}></span>;
                  const iso = formatDate(day);
                  const isOccupied = occupied.has(iso);
                  const isPast = day < today;
                  return (
                    <span
                      className={`day ${isOccupied ? "is-occupied" : ""} ${isPast ? "is-past" : ""}`}
                      title={isOccupied ? "Ocupado" : "Disponible"}
                      key={iso}
                    >
                      {day.getDate()}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="calendar-foot">
          <span>Actualizado: {availability.updatedAt}</span>
          <span>
            Meses {offset + 1}-{Math.min(offset + visibleMonths, months.length)} de {months.length}.
            Estancia mínima orientativa: {availability.minStay} noches
          </span>
        </div>
      </div>
    </section>
  );
}
