import { CalendarDays, ExternalLink, Hotel, Moon } from "lucide-react";
import { getAvailability, hasSanityConfig } from "../lib/sanity";

export default async function AdminHome() {
  const availability = await getAvailability("imperio-1");

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <section className="admin-hero">
          <div>
            <h1>IMPERIO 1</h1>
            <p>
              Panel Next.js ligero para revisar la disponibilidad que Sanity entrega a la landing pública.
              La edición diaria vive en Sanity Studio.
            </p>
          </div>
          <a className="admin-button" href="http://127.0.0.1:4321/imperio-1/" target="_blank" rel="noreferrer">
            Ver landing
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </section>

        <section className="admin-grid">
          <article className="admin-card">
            <h2><CalendarDays size={18} aria-hidden="true" /> Actualización</h2>
            <strong>{availability.updatedAt}</strong>
            <span>{hasSanityConfig ? "Datos desde Sanity" : "Fallback local"}</span>
          </article>
          <article className="admin-card">
            <h2><Moon size={18} aria-hidden="true" /> Estancia mínima</h2>
            <strong>{availability.minStay}</strong>
            <span>noches</span>
          </article>
          <article className="admin-card">
            <h2><Hotel size={18} aria-hidden="true" /> Fechas ocupadas</h2>
            <strong>{availability.occupied.length}</strong>
            <span>bloqueos visibles</span>
          </article>
        </section>

        <section className="admin-card">
          <h2>Bloqueos próximos</h2>
          <ul className="date-list">
            {availability.occupied.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
