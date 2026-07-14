import { defineField, defineType } from "sanity";

const altText = defineField({
  name: "alt",
  title: "Texto alternativo",
  type: "string",
  validation: (rule) => rule.max(90)
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes generales",
  type: "document",
  groups: [
    { name: "brand", title: "Marca" },
    { name: "home", title: "Portada" },
    { name: "promo", title: "Reserva directa" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({ name: "title", title: "Nombre del sitio", type: "string", group: "brand", validation: (rule) => rule.max(70) }),
    defineField({ name: "brand", title: "Marca", type: "string", group: "brand", validation: (rule) => rule.max(46) }),
    defineField({ name: "phone", title: "Telefono / WhatsApp", type: "string", group: "brand", validation: (rule) => rule.max(24) }),
    defineField({ name: "email", title: "Email", type: "string", group: "brand", validation: (rule) => rule.email() }),
    defineField({
      name: "apartments",
      title: "Apartamentos visibles",
      type: "array",
      group: "brand",
      of: [{ type: "reference", to: [{ type: "apartment" }] }],
      validation: (rule) => rule.max(3)
    }),

    defineField({ name: "homeSeoTitle", title: "Meta title de portada", type: "string", group: "seo", validation: (rule) => rule.max(70) }),
    defineField({ name: "homeSeoDescription", title: "Meta description de portada", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(170) }),
    defineField({ name: "homeHeroWord", title: "Titulo grande del hero", type: "string", group: "home", validation: (rule) => rule.max(18) }),
    defineField({ name: "homeEyebrow", title: "Texto pequeno superior", type: "string", group: "home", validation: (rule) => rule.max(42) }),
    defineField({ name: "homeHeadline", title: "Titular de portada", type: "text", rows: 2, group: "home", validation: (rule) => rule.max(110) }),
    defineField({ name: "homeIntro", title: "Texto introductorio", type: "text", rows: 3, group: "home", validation: (rule) => rule.max(240) }),
    defineField({
      name: "homeHeroImage",
      title: "Imagen principal de portada",
      type: "image",
      group: "home",
      options: { hotspot: true },
      fields: [altText]
    }),
    defineField({
      name: "homeHeroImageSmall",
      title: "Imagen principal movil de portada",
      type: "image",
      group: "home",
      options: { hotspot: true },
      fields: [altText]
    }),
    defineField({ name: "homeCta", title: "Texto boton principal", type: "string", group: "home", validation: (rule) => rule.max(32) }),
    defineField({ name: "homeSecondaryCta", title: "Texto boton secundario", type: "string", group: "home", validation: (rule) => rule.max(32) }),

    defineField({ name: "promoLabel", title: "Etiqueta", type: "string", group: "promo", validation: (rule) => rule.max(42) }),
    defineField({ name: "promoTitle", title: "Titulo", type: "string", group: "promo", validation: (rule) => rule.max(86) }),
    defineField({ name: "promoText", title: "Texto", type: "text", rows: 3, group: "promo", validation: (rule) => rule.max(240) }),
    defineField({ name: "promoWhatsappMessage", title: "Mensaje prellenado de WhatsApp", type: "text", rows: 3, group: "promo", validation: (rule) => rule.max(180) }),
    defineField({
      name: "directBenefits",
      title: "Beneficios de reservar directo",
      type: "array",
      group: "promo",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string", validation: (rule) => rule.max(42) }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 2, validation: (rule) => rule.max(130) })
          ],
          preview: { select: { title: "title", subtitle: "text" } }
        }
      ],
      validation: (rule) => rule.max(4)
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "brand"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Ajustes generales",
        subtitle
      };
    }
  }
});
