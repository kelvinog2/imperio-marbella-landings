import { defineField, defineType } from "sanity";

export const availabilityCalendar = defineType({
  name: "availabilityCalendar",
  title: "Calendario de disponibilidad",
  type: "document",
  fields: [
    defineField({
      name: "apartmentSlug",
      title: "Apartamento",
      type: "string",
      initialValue: "imperio-1",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "updatedAt",
      title: "Fecha de actualización",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "minStay",
      title: "Estancia mínima",
      type: "number",
      initialValue: 2,
      validation: (rule) => rule.required().min(1).max(90)
    }),
    defineField({
      name: "occupied",
      title: "Fechas ocupadas",
      type: "array",
      of: [{ type: "date" }],
      validation: (rule) => rule.unique()
    }),
    defineField({
      name: "notes",
      title: "Notas internas",
      type: "text",
      rows: 3
    })
  ],
  preview: {
    select: {
      title: "apartmentSlug",
      updatedAt: "updatedAt"
    },
    prepare({ title, updatedAt }) {
      return {
        title: `Disponibilidad ${title}`,
        subtitle: updatedAt ? `Actualizado ${updatedAt}` : "Sin fecha"
      };
    }
  }
});
