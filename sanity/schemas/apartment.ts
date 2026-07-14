import { defineField, defineType } from "sanity";

const percentPosition = (rule: any) =>
  rule.custom((value: string | undefined) => {
    if (!value) return true;
    return /^\d{1,3}(?:\.\d+)?%$/.test(value) ? true : "Usa un porcentaje, por ejemplo 43% o 44.5%";
  });

const stringList = (name: string, title: string, group: string, maxItems = 10, maxLength = 42) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    of: [{ type: "string", validation: (rule: any) => rule.max(maxLength) }],
    validation: (rule) => rule.max(maxItems)
  });

const labelValueList = (name: string, title: string, group: string, maxItems = 8) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    of: [
      {
        type: "object",
        fields: [
          defineField({ name: "label", title: "Etiqueta", type: "string", validation: (rule) => rule.required().max(32) }),
          defineField({ name: "value", title: "Valor", type: "string", validation: (rule) => rule.required().max(22) })
        ],
        preview: {
          select: { title: "label", subtitle: "value" }
        }
      }
    ],
    validation: (rule) => rule.max(maxItems)
  });

const altText = defineField({
  name: "alt",
  title: "Texto alternativo",
  type: "string",
  validation: (rule) => rule.max(90)
});

export const apartment = defineType({
  name: "apartment",
  title: "Apartamento",
  type: "document",
  groups: [
    { name: "identity", title: "Identidad" },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Contenido" },
    { name: "media", title: "Fotos" },
    { name: "location", title: "Ubicacion" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "displayName",
      title: "Titulo visible",
      description: "Ejemplo: IMPERIO 1, IMPERIO 2, IMPERIO 3.",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().max(18)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "displayName", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "navLabel", title: "Etiqueta de menu", type: "string", group: "identity", validation: (rule) => rule.max(22) }),
    defineField({ name: "name", title: "Nombre completo", type: "string", group: "identity", validation: (rule) => rule.max(90) }),
    defineField({ name: "shortName", title: "Nombre corto", type: "string", group: "identity", validation: (rule) => rule.max(18) }),
    defineField({ name: "subtitle", title: "Subtitulo de tarjeta", type: "string", group: "identity", validation: (rule) => rule.max(34) }),
    defineField({ name: "cardDescription", title: "Descripcion de tarjeta", type: "text", rows: 2, group: "identity", validation: (rule) => rule.max(150) }),
    stringList("cardFacts", "Datos rapidos de tarjeta", "identity", 4, 28),
    defineField({ name: "bookingUrl", title: "Enlace de Booking", type: "url", group: "identity" }),
    defineField({ name: "whatsapp", title: "Numero de WhatsApp", type: "string", group: "identity", validation: (rule) => rule.max(24) }),
    defineField({ name: "email", title: "Email", type: "string", group: "identity", validation: (rule) => rule.email() }),
    defineField({ name: "order", title: "Orden", type: "number", group: "identity", initialValue: 1 }),

    defineField({ name: "heroWord", title: "Titulo grande del hero", type: "string", group: "hero", validation: (rule) => rule.max(18) }),
    defineField({ name: "eyebrow", title: "Texto pequeno superior", type: "string", group: "hero", validation: (rule) => rule.max(42) }),
    defineField({ name: "headline", title: "Titular", type: "text", rows: 2, group: "hero", validation: (rule) => rule.max(110) }),
    defineField({ name: "intro", title: "Texto introductorio", type: "text", rows: 3, group: "hero", validation: (rule) => rule.max(240) }),
    defineField({ name: "cta", title: "Texto del boton principal", type: "string", group: "hero", validation: (rule) => rule.max(32) }),
    defineField({
      name: "heroImage",
      title: "Imagen principal",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [altText]
    }),
    defineField({
      name: "heroImageSmall",
      title: "Imagen principal movil",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [altText]
    }),

    defineField({ name: "description", title: "Descripcion larga", type: "text", rows: 5, group: "content", validation: (rule) => rule.max(620) }),
    stringList("services", "Servicios incluidos", "content", 14, 44),
    labelValueList("quickFacts", "Datos rapidos", "content", 6),
    labelValueList("scores", "Puntuaciones", "content", 8),
    defineField({
      name: "rating",
      title: "Valoracion",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "value", title: "Puntuacion", type: "number", validation: (rule) => rule.min(0).max(10) }),
        defineField({ name: "best", title: "Maximo", type: "number", initialValue: 10, validation: (rule) => rule.min(1).max(10) }),
        defineField({ name: "label", title: "Etiqueta", type: "string", initialValue: "Excepcional", validation: (rule) => rule.max(28) }),
        defineField({ name: "comments", title: "Comentarios", type: "number", validation: (rule) => rule.min(0) })
      ]
    }),
    defineField({
      name: "reviews",
      title: "Comentarios",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "author", title: "Autor", type: "string", validation: (rule) => rule.max(32) }),
            defineField({ name: "country", title: "Pais", type: "string", validation: (rule) => rule.max(32) }),
            defineField({ name: "quote", title: "Comentario", type: "text", rows: 3, validation: (rule) => rule.max(240) })
          ],
          preview: { select: { title: "author", subtitle: "quote" } }
        }
      ],
      validation: (rule) => rule.max(8)
    }),
    defineField({
      name: "faqs",
      title: "Preguntas frecuentes",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Pregunta", type: "string", validation: (rule) => rule.max(90) }),
            defineField({ name: "answer", title: "Respuesta", type: "text", rows: 3, validation: (rule) => rule.max(240) })
          ],
          preview: { select: { title: "question", subtitle: "answer" } }
        }
      ],
      validation: (rule) => rule.max(8)
    }),

    defineField({
      name: "mainImage",
      title: "Imagen de tarjeta principal",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [altText]
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "group", title: "Grupo", type: "string", validation: (rule) => rule.max(28) }),
            defineField({ name: "title", title: "Titulo", type: "string", validation: (rule) => rule.max(64) }),
            defineField({ name: "detail", title: "Detalle", type: "text", rows: 2, validation: (rule) => rule.max(180) }),
            defineField({
              name: "images",
              title: "Imagenes",
              type: "array",
              of: [{ type: "image", options: { hotspot: true }, fields: [altText] }],
              validation: (rule) => rule.min(1).max(8)
            })
          ],
          preview: { select: { title: "title", subtitle: "group" } }
        }
      ],
      validation: (rule) => rule.max(6)
    }),

    defineField({
      name: "address",
      title: "Direccion",
      type: "object",
      group: "location",
      fields: [
        defineField({ name: "street", title: "Calle", type: "string", validation: (rule) => rule.max(80) }),
        defineField({ name: "postalCode", title: "Codigo postal", type: "string", validation: (rule) => rule.max(12) }),
        defineField({ name: "city", title: "Ciudad", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "region", title: "Provincia / Region", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "country", title: "Pais", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "full", title: "Direccion completa", type: "string", validation: (rule) => rule.max(140) })
      ]
    }),
    defineField({ name: "geo", title: "Coordenadas", type: "geopoint", group: "location" }),
    defineField({
      name: "nearby",
      title: "Lugares cercanos",
      type: "array",
      group: "location",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Lugar", type: "string", validation: (rule) => rule.max(42) }),
            defineField({ name: "detail", title: "Distancia / detalle", type: "string", validation: (rule) => rule.max(42) })
          ],
          preview: { select: { title: "label", subtitle: "detail" } }
        }
      ],
      validation: (rule) => rule.max(8)
    }),
    defineField({
      name: "map",
      title: "Mapa",
      type: "object",
      group: "location",
      fields: [
        defineField({ name: "embed", title: "Google Maps embed", type: "url" }),
        defineField({ name: "markerX", title: "Pin desktop X", type: "string", description: "Ejemplo: 43%", validation: percentPosition }),
        defineField({ name: "markerY", title: "Pin desktop Y", type: "string", description: "Ejemplo: 62%", validation: percentPosition }),
        defineField({ name: "markerMobileX", title: "Pin movil X", type: "string", validation: percentPosition }),
        defineField({ name: "markerMobileY", title: "Pin movil Y", type: "string", validation: percentPosition }),
        defineField({ name: "coverOriginalPin", title: "Tapar pin impreso en imagen", type: "boolean" }),
        defineField({ name: "coverX", title: "Tapa desktop X", type: "string", validation: percentPosition }),
        defineField({ name: "coverY", title: "Tapa desktop Y", type: "string", validation: percentPosition }),
        defineField({ name: "coverMobileX", title: "Tapa movil X", type: "string", validation: percentPosition }),
        defineField({ name: "coverMobileY", title: "Tapa movil Y", type: "string", validation: percentPosition })
      ]
    }),

    defineField({ name: "seoTitle", title: "Meta title", type: "string", group: "seo", validation: (rule) => rule.max(70) }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(170) })
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "name",
      media: "mainImage"
    }
  }
});
