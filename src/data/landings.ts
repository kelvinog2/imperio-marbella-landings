export type LandingSlug = "imperio-1" | "imperio-2" | "imperio-3";

export const baseUrl = "https://apartamentosimperio.com";

export const apartment = {
  brand: "Apartamentos Imperio",
  name: "Apartamento IMPERIO 1 - Marbella centro",
  shortName: "IMPERIO 1",
  bookingUrl: "https://www.booking.com/hotel/es/apartamento-imperio1-marbellacentro.es.html",
  phone: "+34 600 000 000",
  email: "reservas@apartamentosimperio.com",
  address: {
    street: "Calle María Auxiliadora 1",
    postalCode: "29602",
    city: "Marbella",
    region: "Málaga",
    country: "España",
    full: "Calle María Auxiliadora 1, 29602 Marbella, España"
  },
  geo: {
    latitude: 36.50883,
    longitude: -4.88705
  },
  rating: {
    value: 9.8,
    best: 10,
    label: "Excepcional",
    comments: 50
  },
  scores: [
    { label: "Anfitrión", value: "10" },
    { label: "Ubicación", value: "10" },
    { label: "WiFi gratis", value: "10" },
    { label: "Instalaciones", value: "9,9" },
    { label: "Limpieza", value: "9,9" },
    { label: "Confort", value: "9,7" }
  ],
  quickFacts: [
    { label: "Adultos", value: "4" },
    { label: "Superficie", value: "65 m2" },
    { label: "Dormitorio", value: "1" },
    { label: "Baño", value: "1" }
  ],
  description:
    "Apartamento IMPERIO 1 - Marbella centro está en pleno corazón de Marbella y ofrece vistas a la ciudad desde el balcón. A 3 minutos a pie de Playa de Venus, con terraza, parking privado gratis, aire acondicionado, cocina equipada, baño completo y sala de estar con sofá-cama.",
  services: [
    "Aire acondicionado",
    "TV grande con Netflix",
    "WiFi gratis",
    "Parking privado",
    "Terraza cerrada",
    "Cocina totalmente equipada",
    "Cesta de bienvenida",
    "Ropa de cama y toallas"
  ],
  nearby: [
    { label: "Playa de Venus", detail: "3 min a pie" },
    { label: "Playa El Faro", detail: "Paseo marítimo cercano" },
    { label: "Playa de la Fontanilla", detail: "Ruta llana por el centro" },
    { label: "Plaza de los Naranjos", detail: "Centro histórico" },
    { label: "Parking privado", detail: "Plaza amplia a pocos metros" },
    { label: "Aeropuerto de Málaga", detail: "54 km" }
  ],
  reviews: [
    {
      author: "Monica",
      country: "España",
      quote:
        "Me gustó todo, inmejorable. Excelente ubicación, limpio, amplio, cómodo y equipado con todo lo que te puedas imaginar."
    },
    {
      author: "Jose",
      country: "España",
      quote:
        "Apartamento bien equipado. Ubicación céntrica. Parking a pocos metros y plaza de garaje amplia. Cesta de bienvenida."
    },
    {
      author: "Vanessa",
      country: "España",
      quote:
        "Maravilloso, apartamento totalmente equipado. En el mismo centro a dos minutos de playa. Cesta de bienvenida magnífica."
    },
    {
      author: "John",
      country: "Irlanda",
      quote:
        "Great location. Nice spacious apartment. Very obliging owners. Availability of parking."
    }
  ],
  gallery: [
    {
      group: "Salón",
      title: "Salón abierto a la terraza",
      images: ["/assets/apartamento/imperio-12.webp", "/assets/apartamento/imperio-04.webp", "/assets/apartamento/imperio-01.webp", "/assets/apartamento/imperio-09.webp"],
      detail: "Zona de estar amplia, mesa preparada, sofá-cama y salida directa a la terraza cerrada."
    },
    {
      group: "Descanso",
      title: "Dormitorio silencioso",
      images: ["/assets/apartamento/imperio-08.webp", "/assets/apartamento/imperio-10.webp", "/assets/apartamento/imperio-14.webp"],
      detail: "Cama preparada, armarios y luz natural para descansar después de playa o paseo por el centro."
    },
    {
      group: "Cocina",
      title: "Cocina lista para entrar",
      images: ["/assets/apartamento/imperio-03.webp", "/assets/apartamento/imperio-17.webp", "/assets/apartamento/imperio-13.webp"],
      detail: "Nevera, cafetera, utensilios y detalles de bienvenida para no perder tiempo al llegar."
    },
    {
      group: "Ubicación",
      title: "Centro, parking y playa",
      images: ["/assets/apartamento/imperio-15.webp", "/assets/apartamento/imperio-06.webp", "/assets/apartamento/imperio-16.webp", "/assets/apartamento/imperio-07.webp"],
      detail: "Dirección céntrica, garaje privado y referencias visuales para llegar sin fricción."
    }
  ],
  map: {
    light: "/assets/map/mapa.webp",
    lightSmall: "/assets/map/mapa-sm.webp",
    satellite: "/assets/map/satelital.webp",
    satelliteSmall: "/assets/map/satelital-sm.webp",
    embed:
      "https://www.google.com/maps?q=Calle%20Mar%C3%ADa%20Auxiliadora%201%2C%2029602%20Marbella%2C%20Espa%C3%B1a&output=embed"
  },
  faqs: [
    {
      question: "¿A cuánta distancia está la playa?",
      answer: "Playa de Venus está a unos 3 minutos a pie desde el apartamento."
    },
    {
      question: "¿Tiene parking?",
      answer: "Sí. El alojamiento dispone de parking privado gratis y plaza amplia a pocos metros."
    },
    {
      question: "¿Cuántas personas pueden alojarse?",
      answer: "La capacidad indicada es de hasta 4 adultos, con un dormitorio y sala de estar con sofá-cama."
    },
    {
      question: "¿Cómo uso el código promocional?",
      answer: "Escríbenos por WhatsApp con tu código, fechas y número de huéspedes. Te responderemos con una tarifa especial de reserva directa."
    }
  ]
};

export const apartment2 = {
  brand: "Apartamentos Imperio",
  name: "Apartamento IMPERIO 2 - Marbella centro",
  shortName: "IMPERIO 2",
  bookingUrl: "https://www.booking.com/hotel/es/apartamento-imperio-2-marbella-centro.es.html",
  phone: "+34 600 000 000",
  email: "reservas@apartamentosimperio.com",
  address: {
    street: "Calle Maria Auxiliadora",
    postalCode: "29602",
    city: "Marbella",
    region: "Malaga",
    country: "Espana",
    full: "Calle Maria Auxiliadora, 29602 Marbella, Espana"
  },
  geo: {
    latitude: 36.50883,
    longitude: -4.88705
  },
  rating: {
    value: 9.9,
    best: 10,
    label: "Excepcional",
    comments: 53
  },
  scores: [
    { label: "Anfitrion", value: "10" },
    { label: "Instalaciones", value: "9,9" },
    { label: "Limpieza", value: "10" },
    { label: "Confort", value: "10" },
    { label: "Calidad-precio", value: "9,7" },
    { label: "Ubicacion", value: "10" },
    { label: "WiFi gratis", value: "10" }
  ],
  quickFacts: [
    { label: "Huespedes", value: "4" },
    { label: "Superficie", value: "125 m2" },
    { label: "Dormitorios", value: "2" },
    { label: "Banos", value: "2" }
  ],
  description:
    "Apartamento IMPERIO 2 - Marbella centro esta en el corazon de Marbella y ofrece una estancia amplia de 125 m2 con dos dormitorios, dos banos, terraza, balcon, aire acondicionado, cocina completa y banera de hidromasaje. Playa de Venus queda a unos 2 minutos a pie.",
  services: [
    "Parking gratis",
    "WiFi gratis",
    "Terraza y balcon",
    "Banera de hidromasaje",
    "Cocina privada",
    "Lavadora",
    "Aire acondicionado",
    "TV de pantalla plana",
    "Caja fuerte",
    "Adaptado para movilidad reducida"
  ],
  nearby: [
    { label: "Playa de Venus", detail: "2 min a pie" },
    { label: "Plaza de los Naranjos", detail: "400 m" },
    { label: "Parque de Alameda", detail: "450 m" },
    { label: "Restaurante Gallery", detail: "10 m" },
    { label: "Playa El Faro", detail: "400 m" },
    { label: "Aeropuerto de Malaga", detail: "53 km" }
  ],
  reviews: [
    {
      author: "Rosana",
      country: "Espana",
      quote:
        "Esencia de Marbella con todo el confort de un hogar de lujo. Las fotos no son fieles, la realidad las supera."
    },
    {
      author: "M",
      country: "Espana",
      quote:
        "Apartamento muy amplio, camas muy comodas y equipado hasta el ultimo detalle."
    },
    {
      author: "Peroggi",
      country: "Argentina",
      quote:
        "Ubicacion perfecta, a nada de la playa y el centro, cerca de restaurantes. El departamento es excelente."
    },
    {
      author: "Eduardo",
      country: "Espana",
      quote:
        "Ubicacion top. Servicio de calidad del operador. Apartamento nuevo con parking incluido."
    }
  ],
  gallery: [
    {
      group: "Salon",
      title: "Un apartamento amplio para vivir Marbella",
      images: ["/assets/imperio-2/imperio-2-01.webp", "/assets/imperio-2/imperio-2-02.webp", "/assets/imperio-2/imperio-2-03.webp", "/assets/imperio-2/imperio-2-04.webp"],
      detail: "125 m2 para entrar sin prisas, descansar y tener espacio real para cuatro personas."
    },
    {
      group: "Descanso",
      title: "Dos dormitorios y dos banos",
      images: ["/assets/imperio-2/imperio-2-07.webp", "/assets/imperio-2/imperio-2-08.webp", "/assets/imperio-2/imperio-2-09.webp", "/assets/imperio-2/imperio-2-10.webp"],
      detail: "Dormitorio principal con cama grande y segunda habitacion con dos camas individuales."
    },
    {
      group: "Bienestar",
      title: "Jacuzzi, terraza y detalles de llegada",
      images: ["/assets/imperio-2/imperio-2-12.webp", "/assets/imperio-2/imperio-2-14.webp", "/assets/imperio-2/imperio-2-18.webp", "/assets/imperio-2/imperio-2-21.webp"],
      detail: "Un punto premium dentro del centro, con terraza y banera de hidromasaje para cerrar el dia."
    },
    {
      group: "Ubicacion",
      title: "Centro, playa y restaurantes",
      images: ["/assets/imperio-2/imperio-2-16.webp", "/assets/imperio-2/imperio-2-17.webp", "/assets/imperio-2/imperio-2-23.webp", "/assets/imperio-2/imperio-2-24.webp"],
      detail: "Playa de Venus, casco historico y restaurantes quedan a mano para moverse sin coche."
    }
  ],
  map: {
    light: "/assets/map/mapa.webp",
    lightSmall: "/assets/map/mapa-sm.webp",
    satellite: "/assets/map/satelital.webp",
    satelliteSmall: "/assets/map/satelital-sm.webp",
    embed:
      "https://www.google.com/maps?q=Calle%20Mar%C3%ADa%20Auxiliadora%2C%2029602%20Marbella%2C%20Espa%C3%B1a&output=embed"
  },
  faqs: [
    {
      question: "¿A cuanta distancia esta la playa?",
      answer: "Playa de Venus esta a unos 2 minutos a pie desde el apartamento."
    },
    {
      question: "¿Tiene jacuzzi?",
      answer: "Si. IMPERIO 2 cuenta con banera de hidromasaje y terraza."
    },
    {
      question: "¿Cuantas personas pueden alojarse?",
      answer: "El alojamiento esta preparado para hasta 4 huespedes, con 2 dormitorios, 3 camas y 2 banos."
    },
    {
      question: "¿Como consigo tarifa directa?",
      answer: "Genera tu codigo promocional en la landing y envianoslo por WhatsApp con tus fechas."
    }
  ]
};

export const apartment3 = {
  brand: "Apartamentos Imperio",
  name: "Apartamento IMPERIO 3 - Puerto deportivo Playa Marbella",
  shortName: "IMPERIO 3",
  bookingUrl: "https://www.booking.com/hotel/es/apartamento-imperio-3-puerto-deportivo-playa-marbella.es.html",
  phone: "+34 600 000 000",
  email: "reservas@apartamentosimperio.com",
  address: {
    street: "Avenida Duque de Ahumada 9",
    postalCode: "29602",
    city: "Marbella",
    region: "Malaga",
    country: "Espana",
    full: "Avenida Duque de Ahumada 9, 29602 Marbella, Espana"
  },
  geo: {
    latitude: 36.50774,
    longitude: -4.88884
  },
  rating: {
    value: 9.8,
    best: 10,
    label: "Excepcional",
    comments: 41
  },
  scores: [
    { label: "Anfitrion", value: "10" },
    { label: "Instalaciones", value: "9,7" },
    { label: "Limpieza", value: "9,9" },
    { label: "Confort", value: "9,9" },
    { label: "Calidad-precio", value: "9,9" },
    { label: "Ubicacion", value: "9,6" },
    { label: "WiFi gratis", value: "10" }
  ],
  quickFacts: [
    { label: "Huespedes", value: "4" },
    { label: "Superficie", value: "45 m2" },
    { label: "Dormitorio", value: "1" },
    { label: "Bano", value: "1" }
  ],
  description:
    "Apartamento IMPERIO 3 - Puerto deportivo Playa Marbella esta frente a la playa, en la entrada del puerto deportivo. Un apartamento reformado con terraza, balcon, vistas, WiFi gratis, aire acondicionado, cocina y una ubicacion pensada para salir caminando al mar y al casco antiguo.",
  services: [
    "Frente a la playa",
    "Parking gratis",
    "WiFi gratis",
    "Terraza y balcon",
    "Cocina y zona de cocina",
    "Lavadora y secadora",
    "Aire acondicionado",
    "TV de pantalla plana",
    "Caja fuerte",
    "Adaptado para movilidad reducida"
  ],
  nearby: [
    { label: "Playa de Venus", detail: "50 m" },
    { label: "Puerto deportivo", detail: "A pasos" },
    { label: "Playa El Faro", detail: "200 m" },
    { label: "Plaza de los Naranjos", detail: "500 m" },
    { label: "Parque de Alameda", detail: "550 m" },
    { label: "Aeropuerto de Malaga", detail: "53 km" }
  ],
  reviews: [
    {
      author: "Boris",
      country: "Argentina",
      quote:
        "Departamento hermoso e impecable. Muy bien ubicado y excelente la atencion del propietario."
    },
    {
      author: "Maria",
      country: "Argentina",
      quote:
        "Excelente atencion, siempre atentos a cualquier necesidad. El departamento impecable y comodo."
    },
    {
      author: "Georgia",
      country: "Reino Unido",
      quote:
        "Ubicacion central junto a la playa, con vista perfecta del puerto y las montanas."
    },
    {
      author: "Kateryna",
      country: "Ucrania",
      quote:
        "Gran lugar cerca del mar, con vistas fantasticas y todo lo necesario para vacaciones."
    }
  ],
  gallery: [
    {
      group: "Puerto",
      title: "El mar como primera referencia",
      images: ["/assets/imperio-3/imperio-3-01.webp", "/assets/imperio-3/imperio-3-02.webp"],
      detail: "Una ubicacion frente a la playa y junto al puerto deportivo para moverte a pie desde la llegada."
    },
    {
      group: "Interior",
      title: "Compacto, moderno y muy practico",
      images: ["/assets/imperio-3/imperio-3-03.webp", "/assets/imperio-3/imperio-3-04.webp"],
      detail: "Salon, dormitorio y cocina preparados para una estancia funcional en pleno centro."
    },
    {
      group: "Descanso",
      title: "Balcon, luz y comodidad",
      images: ["/assets/imperio-3/imperio-3-05.webp", "/assets/imperio-3/imperio-3-06.webp"],
      detail: "El punto ideal para quien quiere playa, paseo maritimo y casco antiguo sin depender del coche."
    },
    {
      group: "Detalles",
      title: "Todo listo para llegar",
      images: ["/assets/imperio-3/imperio-3-07.webp", "/assets/imperio-3/imperio-3-08.webp"],
      detail: "WiFi, aire acondicionado, cocina, lavadora y detalles pensados para una escapada facil."
    }
  ],
  map: {
    light: "/assets/map/mapa.webp",
    lightSmall: "/assets/map/mapa-sm.webp",
    satellite: "/assets/map/satelital.webp",
    satelliteSmall: "/assets/map/satelital-sm.webp",
    embed:
      "https://www.google.com/maps?q=Avenida%20Duque%20de%20Ahumada%209%2C%2029602%20Marbella%2C%20Espa%C3%B1a&output=embed"
  },
  faqs: [
    {
      question: "¿Esta frente a la playa?",
      answer: "Si. IMPERIO 3 esta situado frente a la playa, junto al puerto deportivo de Marbella."
    },
    {
      question: "¿Tiene parking?",
      answer: "Si. El alojamiento indica parking gratis en las inmediaciones, con reserva necesaria."
    },
    {
      question: "¿Cuantas personas pueden alojarse?",
      answer: "Cuenta con un dormitorio, sofa cama en la sala de estar y capacidad para una estancia comoda."
    },
    {
      question: "¿Como uso el descuento?",
      answer: "Genera tu codigo promocional y envianoslo por WhatsApp junto con tus fechas."
    }
  ]
};

export const apartments = [apartment, apartment2, apartment3] as const;
export type Apartment = (typeof apartments)[number];

export const promo = {
  label: "Ruleta promocional exclusiva",
  title: "¿Has recibido una tarjeta con QR?",
  text:
    "Genera una sola vez tu código promocional único y envíanoslo por WhatsApp con tus fechas, número de huéspedes y apartamento favorito.",
  whatsappMessage:
    "Hola, he llegado desde la landing de Apartamentos Imperio. Quiero consultar tarifa directa para Marbella."
};

export const whatsappHref = `https://wa.me/34600000000?text=${encodeURIComponent(promo.whatsappMessage)}`;

export const directBenefits = [
  {
    title: "Mejor precio directo",
    text: "Tarifa especial para clientes que llegan desde tarjeta, QR o recomendación."
  },
  {
    title: "Atención por WhatsApp",
    text: "Consulta fechas, huéspedes y preferencias sin pasar por formularios largos."
  },
  {
    title: "Código instantáneo",
    text: "Puedes desbloquear 5%, 10% o 15% de descuento para pedir una tarifa directa."
  },
  {
    title: "Valoración verificada",
    text: "Los tres apartamentos trabajan con puntuaciones excepcionales en Booking.com."
  }
] as const;

export const apartmentCards = [
  {
    slug: "imperio-1",
    name: "IMPERIO 1",
    subtitle: "Suite Mediterránea",
    rating: "9,8",
    image: "/assets/apartamento/imperio-12.webp",
    description: "Centro de Marbella, terraza, parking privado y Playa de Venus a 3 minutos a pie.",
    facts: ["4 huéspedes", "65 m2", "Parking"],
    href: "/imperio-1/",
    bookingHref: apartment.bookingUrl
  },
  {
    slug: "imperio-2",
    name: "IMPERIO 2",
    subtitle: "Ático Solana",
    rating: "9,9",
    image: "/assets/imperio-2/imperio-2-01.webp",
    description: "125 m2, 2 dormitorios, jacuzzi, terraza y Playa de Venus a 2 minutos a pie.",
    facts: ["4 huéspedes", "125 m2", "Jacuzzi"],
    href: "/imperio-2/",
    bookingHref: apartment2.bookingUrl
  },
  {
    slug: "imperio-3",
    name: "IMPERIO 3",
    subtitle: "Costa Serena",
    rating: "9,8",
    image: "/assets/imperio-3/imperio-3-01.webp",
    description: "Frente a la playa y junto al puerto deportivo, con terraza y vistas.",
    facts: ["Playa", "45 m2", "Puerto"],
    href: "/imperio-3/",
    bookingHref: apartment3.bookingUrl
  }
] as const;

export const locationApartments = [
  {
    id: "imperio-1-2",
    name: "Imperio 1 & 2",
    type: "Apartamentos",
    detail: "Calle María Auxiliadora",
    description:
      "Zona céntrica para combinar playa, casco histórico, restaurantes y vida comercial. Playa de Venus queda a unos 3 minutos a pie.",
    x: 52.2,
    y: 26.8
  },
  {
    id: "imperio-3",
    name: "Imperio 3",
    type: "Apartamento",
    detail: "Av. Duque de Ahumada",
    description:
      "Ubicación marítima junto al puerto deportivo, el paseo y la playa. Ideal para quien quiere salir caminando hacia el mar.",
    x: 67.0,
    y: 45.8
  }
] as const;

export const interestPoints = [
  {
    id: "plaza-naranjos",
    number: 1,
    name: "Plaza de los Naranjos",
    type: "Centro histórico",
    time: "5 min desde Imperio 1 & 2",
    description:
      "El corazón del casco histórico, con terrazas, naranjos y edificios del siglo XV como el Ayuntamiento.",
    x: 51.1,
    y: 36.8
  },
  {
    id: "casco-antiguo",
    number: 2,
    name: "Casco Antiguo de Marbella",
    type: "Atracción turística",
    time: "3 min desde Imperio 1 & 2",
    description:
      "Callejuelas blancas, flores, boutiques y restaurantes con encanto para pasear sin coche.",
    x: 55.8,
    y: 43.6
  },
  {
    id: "avenida-mar",
    number: 3,
    name: "Avenida del Mar",
    type: "Paseo peatonal",
    time: "A pasos desde Imperio 3",
    description:
      "Museo al aire libre con esculturas de bronce atribuidas a Salvador Dalí, entre el centro y el paseo marítimo.",
    x: 75.7,
    y: 46.0
  },
  {
    id: "alameda",
    number: 4,
    name: "Parque de la Alameda",
    type: "Parque",
    time: "3-4 min caminando",
    description:
      "El pulmón verde del centro, con vegetación tropical, fuente histórica y bancos de azulejos andaluces.",
    x: 34.7,
    y: 46.7
  },
  {
    id: "encarnacion",
    number: 5,
    name: "Iglesia de la Encarnación",
    type: "Patrimonio",
    time: "7 min desde Imperio 1 & 2",
    description:
      "Iglesia renacentista y barroca levantada sobre una antigua mezquita, con un retablo mayor muy reconocible.",
    x: 36.6,
    y: 32.0
  },
  {
    id: "muralla",
    number: 6,
    name: "Muralla Urbana de Marbella",
    type: "Lugar histórico",
    time: "8-10 min desde Imperio 1 & 2",
    description:
      "Restos de la antigua fortaleza árabe del siglo X y del recinto amurallado que protegía la ciudad musulmana.",
    x: 13.8,
    y: 31.2
  },
  {
    id: "paseo-maritimo",
    number: 7,
    name: "Paseo Marítimo",
    type: "Paseo junto al mar",
    time: "3 min desde Imperio 1 & 2",
    description:
      "Kilómetros de paseo peatonal con palmeras, chiringuitos, restaurantes, tiendas y cafeterías frente al Mediterráneo.",
    x: 24.6,
    y: 56.6
  },
  {
    id: "playa-venus",
    number: 8,
    name: "Playa de Venus",
    type: "Playa urbana",
    time: "3 min desde Imperio 1 & 2",
    description:
      "Una de las playas urbanas más populares de Marbella, cómoda para baño, sol y restaurantes de playa.",
    x: 45.8,
    y: 58.4
  },
  {
    id: "puerto-deportivo",
    number: 9,
    name: "Puerto Deportivo de Marbella",
    type: "Puerto deportivo",
    time: "Menos de 1 min desde Imperio 3",
    description:
      "Punto de encuentro para ver barcos, deportes acuáticos, gastronomía y ambiente nocturno junto al mar.",
    x: 84.0,
    y: 58.8
  }
] as const;

export const mainLanding = {
  slug: "",
  navLabel: "Inicio",
  title: "Apartamentos Imperio Marbella | Código promocional exclusivo",
  metaDescription:
    "Landing principal de Apartamentos Imperio Marbella: apartamentos con valoración excepcional, beneficios de reserva directa y código promocional exclusivo por WhatsApp.",
  heroWord: "IMPERIO",
  eyebrow: "Código promocional exclusivo",
  headline: "Descubre Marbella con precio especial por reserva directa.",
  intro:
    "Si has recibido una tarjeta con QR, genera tu código promocional y envíanoslo por WhatsApp con tus fechas. Te preparamos una tarifa directa para alojarte en Apartamentos Imperio.",
  heroImage: "/assets/main/hero-marbella.webp",
  heroImageSmall: "/assets/main/hero-marbella-sm.webp",
  cta: "Generar descuento",
  primaryHref: "#reserva-directa",
  secondaryCta: "Ver apartamentos",
  secondaryHref: "#apartamentos",
  scrollTarget: "#apartamentos",
  angle: "Reserva directa",
  accent: "sea"
} as const;

export const landing = {
  slug: "imperio-1",
  navLabel: "Imperio 1",
  title: "Apartamento IMPERIO 1 - Marbella centro",
  metaDescription:
    "Apartamento IMPERIO 1 en Marbella centro: 9,8 excepcional, a 3 minutos de Playa de Venus, terraza, parking privado, WiFi y tarifa especial por reserva directa.",
  heroWord: "IMPERIO",
  eyebrow: "Marbella centro",
  headline: "Terraza, playa y parking en una dirección imposible de mejorar.",
  intro:
    "Un apartamento amplio, limpio y totalmente equipado para moverte por Marbella a pie, descansar con calma y reservar directamente con una tarifa especial.",
  heroImage: "/assets/apartamento/imperio-12.webp",
  cta: "Reservar directo",
  primaryHref: "#reserva-directa",
  secondaryCta: "Ver en Booking",
  secondaryHref: apartment.bookingUrl,
  scrollTarget: "#valoracion",
  angle: "Reserva directa",
  accent: "sea"
} as const;

export const landing2 = {
  slug: "imperio-2",
  navLabel: "Imperio 2",
  title: "Apartamento IMPERIO 2 - Marbella centro",
  metaDescription:
    "Apartamento IMPERIO 2 en Marbella centro: 9,9 excepcional, 125 m2, 2 dormitorios, jacuzzi, terraza, parking gratis y tarifa especial por reserva directa.",
  heroWord: "IMPERIO",
  eyebrow: "Marbella centro",
  headline: "Un apartamento amplio con jacuzzi a dos minutos de la playa.",
  intro:
    "125 m2, dos dormitorios, terraza, parking y una ubicacion perfecta para combinar centro historico, restaurantes y Playa de Venus sin depender del coche.",
  heroImage: "/assets/imperio-2/imperio-2-01.webp",
  cta: "Reservar directo",
  primaryHref: "#reserva-directa",
  secondaryCta: "Ver en Booking",
  secondaryHref: apartment2.bookingUrl,
  scrollTarget: "#valoracion",
  angle: "Reserva directa",
  accent: "sea"
} as const;

export const landing3 = {
  slug: "imperio-3",
  navLabel: "Imperio 3",
  title: "Apartamento IMPERIO 3 - Puerto deportivo Playa Marbella",
  metaDescription:
    "Apartamento IMPERIO 3 frente a la playa y junto al puerto deportivo de Marbella: 9,8 excepcional, terraza, vistas, WiFi, parking gratis y tarifa directa.",
  heroWord: "IMPERIO",
  eyebrow: "Puerto deportivo",
  headline: "Despertar junto al puerto y bajar al mar en segundos.",
  intro:
    "Un apartamento reformado frente a la playa, con terraza, vistas, WiFi y la energia del puerto deportivo para vivir Marbella caminando.",
  heroImage: "/assets/imperio-3/imperio-3-01.webp",
  cta: "Reservar directo",
  primaryHref: "#reserva-directa",
  secondaryCta: "Ver en Booking",
  secondaryHref: apartment3.bookingUrl,
  scrollTarget: "#valoracion",
  angle: "Reserva directa",
  accent: "sea"
} as const;

export const landings = [
  landing,
  landing2,
  landing3
] as const;

export function getLanding(slug: string) {
  return landings.find((landing) => landing.slug === slug);
}
