# Apartamentos Imperio Marbella

Landing principal y landings individuales para IMPERIO 1, IMPERIO 2 e IMPERIO 3.

## Stack

- Astro para la web publica estatica.
- React para islas interactivas.
- Three.js para la transicion visual del mapa.
- Sanity como CMS para contenido editable.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm sanity:dev
pnpm sanity:deploy
```

Rutas publicas:

- `/`
- `/imperio-1/`
- `/imperio-2/`
- `/imperio-3/`

## Sanity

Copia `.env.example` a `.env` si necesitas cambiar el proyecto o dataset. El proyecto actual usa:

```bash
PUBLIC_SANITY_PROJECT_ID=8vfyivj2
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-07-04
SANITY_STUDIO_PROJECT_ID=8vfyivj2
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=8vfyivj2
SANITY_DATASET=production
```

El Studio incluye un escritorio editorial con:

- `Portada principal`: textos del hero, CTA, telefono, email, reserva directa y SEO.
- `Apartamentos`: contenido completo de IMPERIO 1, IMPERIO 2 e IMPERIO 3.
- `Galerias de fotos`: acceso directo a las galerias de cada apartamento.
- `Mapas y pines`: direccion, coordenadas y posicion del pin de cada apartamento.
- `SEO y reserva directa`: ajustes generales de metadatos y textos comerciales.

Ya no existe calendario de disponibilidad en Sanity.

La web consulta Sanity durante `pnpm build`. Si un campo no existe o Sanity no responde, usa el contenido local de `src/data/landings.ts` para no romper el diseno.

Para que Cloudflare Pages actualice cambios de Sanity automaticamente, conecta un webhook de Sanity al deploy hook de Cloudflare Pages.
