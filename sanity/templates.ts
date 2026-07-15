import type { Template } from "sanity";

const commonApartment = {
  whatsapp: "+34 600 000 000",
  email: "reservas@apartamentosimperio.com",
  rating: {
    best: 10,
    label: "Excepcional"
  }
};

export const templates: Template[] = [
  {
    id: "siteSettings",
    title: "Ajustes generales",
    schemaType: "siteSettings",
    value: {
      title: "Apartamentos Imperio Marbella",
      brand: "Apartamentos Imperio",
      phone: "+34 600 000 000",
      email: "reservas@apartamentosimperio.com",
      homeHeroWord: "IMPERIO",
      homeEyebrow: "Tarjeta promocional directa",
      homeHeadline: "Descubre Marbella con precio especial por reserva directa.",
      homeIntro:
        "Escribenos por WhatsApp con el codigo de tu tarjeta, fechas y huespedes. Te enviamos precio especial directo.",
      homeCta: "Solicitar precio",
      homeSecondaryCta: "Ver apartamentos",
      promoLabel: "Tarjeta promocional directa",
      promoTitle: "Tu tarjeta ya activa precio especial.",
      promoText:
        "Escribenos por WhatsApp con el codigo de tu tarjeta, fechas, numero de huespedes y apartamento favorito.",
      promoWhatsappMessage:
        "Hola, he recibido una tarjeta promocional de Apartamentos Imperio. Quiero solicitar precio especial. Mi codigo es: ",
      directBenefits: [
        {
          title: "Precio especial con tarjeta",
          text: "Solo tienes que compartir el codigo por WhatsApp."
        },
        {
          title: "Atencion por WhatsApp",
          text: "Consulta fechas, huespedes y preferencias sin formularios."
        },
        {
          title: "Respuesta directa",
          text: "Te indicamos disponibilidad, precio y siguientes pasos."
        },
        {
          title: "Valoracion verificada",
          text: "Apartamentos con puntuaciones excepcionales en Booking.com."
        }
      ]
    }
  },
  {
    id: "apartment-imperio-1",
    title: "IMPERIO 1",
    schemaType: "apartment",
    value: {
      ...commonApartment,
      displayName: "IMPERIO 1",
      slug: { _type: "slug", current: "imperio-1" },
      navLabel: "Imperio 1",
      shortName: "IMPERIO 1",
      name: "Apartamento IMPERIO 1 - Marbella centro",
      subtitle: "Suite Mediterranea",
      heroWord: "IMPERIO 1",
      eyebrow: "Marbella centro",
      order: 1
    }
  },
  {
    id: "apartment-imperio-2",
    title: "IMPERIO 2",
    schemaType: "apartment",
    value: {
      ...commonApartment,
      displayName: "IMPERIO 2",
      slug: { _type: "slug", current: "imperio-2" },
      navLabel: "Imperio 2",
      shortName: "IMPERIO 2",
      name: "Apartamento IMPERIO 2 - Marbella centro",
      subtitle: "Atico Solana",
      heroWord: "IMPERIO 2",
      eyebrow: "Marbella centro",
      order: 2
    }
  },
  {
    id: "apartment-imperio-3",
    title: "IMPERIO 3",
    schemaType: "apartment",
    value: {
      ...commonApartment,
      displayName: "IMPERIO 3",
      slug: { _type: "slug", current: "imperio-3" },
      navLabel: "Imperio 3",
      shortName: "IMPERIO 3",
      name: "Apartamento IMPERIO 3 - Puerto deportivo Playa Marbella",
      subtitle: "Costa Serena",
      heroWord: "IMPERIO 3",
      eyebrow: "Puerto deportivo",
      order: 3
    }
  }
];
