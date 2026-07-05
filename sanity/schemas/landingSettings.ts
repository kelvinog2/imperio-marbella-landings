import { defineField, defineType } from "sanity";

export const landingSettings = defineType({
  name: "landingSettings",
  title: "Landing IMPERIO 1",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título SEO",
      type: "string"
    }),
    defineField({
      name: "metaDescription",
      title: "Descripción SEO",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "bookingUrl",
      title: "URL de reserva",
      type: "url"
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string"
    }),
    defineField({
      name: "featuredNotice",
      title: "Aviso destacado",
      type: "string"
    })
  ]
});
