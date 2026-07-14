# Apartamentos Imperio Marbella

Landing principal y landings individuales para IMPERIO 1, IMPERIO 2 e IMPERIO 3.

## Stack

- Astro para la web publica estatica.
- React para islas interactivas.
- Three.js para la transicion visual del mapa.
- Sanity como CMS para contenido editable.
- Next.js en `apps/admin-next` como panel auxiliar.

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

El Studio incluye dos tipos principales:

- `Apartamento`: nombre visible, slug, textos, hero, fotos, galeria, valoraciones, servicios, enlaces, direccion, coordenadas, pin del mapa y SEO.
- `Ajustes generales`: portada, telefono, email, apartamentos visibles, textos de reserva directa, beneficios y SEO de inicio.

La web consulta Sanity durante `pnpm build`. Si un campo no existe o Sanity no responde, usa el contenido local de `src/data/landings.ts` para no romper el diseno.

Para que Cloudflare Pages actualice cambios de Sanity automaticamente, conecta un webhook de Sanity al deploy hook de Cloudflare Pages.
