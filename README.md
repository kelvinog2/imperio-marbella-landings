# Apartamento IMPERIO 1 - Marbella centro

Landing page Astro + React para una campaña con QR de tarjetas de visita.

## Stack

- Astro para la landing pública estática.
- React para islas interactivas: hero 3D, galería, mapa dormido y calendario.
- Three.js para el plano visual animado del hero.
- Sanity para disponibilidad editable por administrador.
- Next.js en `apps/admin-next` como panel ligero de revisión.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm dev:admin
pnpm sanity:dev
```

La landing pública queda en `/imperio-1/`.

## Sanity

Copia `.env.example` a `.env` y rellena:

```bash
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=
SANITY_DATASET=production
```

El documento `availabilityCalendar` debe usar `apartmentSlug = "imperio-1"`.
