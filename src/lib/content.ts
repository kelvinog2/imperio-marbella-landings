import {
  apartment,
  apartment2,
  apartment3,
  apartmentCards,
  apartments,
  directBenefits,
  landing,
  landing2,
  landing3,
  mainLanding,
  promo,
  whatsappHref as fallbackWhatsappHref,
  type Apartment,
  type LandingSlug
} from "@/data/landings";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { sanityFetch } from "@/lib/sanityClient";

type LocalLanding = typeof landing | typeof landing2 | typeof landing3;

export type ApartmentCardView = {
  slug: LandingSlug;
  name: string;
  subtitle: string;
  rating: string;
  image: string;
  description: string;
  facts: readonly string[] | string[];
  href: string;
  bookingHref: string;
};

export type MainGalleryGroup = {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  images: {
    src: string;
    label: string;
    featured?: boolean;
  }[];
};

type SanityMap = {
  embed?: string;
  markerX?: string;
  markerY?: string;
  markerMobileX?: string;
  markerMobileY?: string;
  coverOriginalPin?: boolean;
  coverX?: string;
  coverY?: string;
  coverMobileX?: string;
  coverMobileY?: string;
};

type SanityApartment = {
  displayName?: string;
  slug?: string;
  navLabel?: string;
  name?: string;
  shortName?: string;
  subtitle?: string;
  cardDescription?: string;
  cardFacts?: string[];
  bookingUrl?: string;
  whatsapp?: string;
  email?: string;
  order?: number;
  heroWord?: string;
  eyebrow?: string;
  headline?: string;
  intro?: string;
  cta?: string;
  heroImage?: string;
  heroImageSmall?: string;
  description?: string;
  services?: string[];
  quickFacts?: { label?: string; value?: string }[];
  scores?: { label?: string; value?: string }[];
  rating?: {
    value?: number;
    best?: number;
    label?: string;
    comments?: number;
  };
  reviews?: { author?: string; country?: string; quote?: string }[];
  faqs?: { question?: string; answer?: string }[];
  mainImage?: string;
  gallery?: { group?: string; title?: string; detail?: string; images?: string[] }[];
  address?: Partial<Apartment["address"]>;
  geo?: Partial<Apartment["geo"]>;
  nearby?: { label?: string; detail?: string }[];
  map?: SanityMap;
  seoTitle?: string;
  seoDescription?: string;
};

type SanitySettings = {
  title?: string;
  brand?: string;
  phone?: string;
  email?: string;
  apartments?: SanityApartment[];
  homeSeoTitle?: string;
  homeSeoDescription?: string;
  homeHeroWord?: string;
  homeEyebrow?: string;
  homeHeadline?: string;
  homeIntro?: string;
  homeHeroImage?: string;
  homeHeroImageSmall?: string;
  homeCta?: string;
  homeSecondaryCta?: string;
  promoLabel?: string;
  promoTitle?: string;
  promoText?: string;
  promoWhatsappMessage?: string;
  directBenefits?: { title?: string; text?: string }[];
};

const apartmentFields = `
  displayName,
  "slug": slug.current,
  navLabel,
  name,
  shortName,
  subtitle,
  cardDescription,
  cardFacts,
  bookingUrl,
  whatsapp,
  email,
  order,
  heroWord,
  eyebrow,
  headline,
  intro,
  cta,
  "heroImage": heroImage.asset->url,
  "heroImageSmall": heroImageSmall.asset->url,
  description,
  services,
  quickFacts,
  scores,
  rating,
  reviews,
  faqs,
  "mainImage": mainImage.asset->url,
  gallery[]{
    group,
    title,
    detail,
    "images": images[].asset->url
  },
  address,
  "geo": {
    "latitude": geo.lat,
    "longitude": geo.lng
  },
  nearby,
  map,
  seoTitle,
  seoDescription
`;

const settingsFields = `
  title,
  brand,
  phone,
  email,
  apartments[]->{${apartmentFields}},
  homeSeoTitle,
  homeSeoDescription,
  homeHeroWord,
  homeEyebrow,
  homeHeadline,
  homeIntro,
  "homeHeroImage": homeHeroImage.asset->url,
  "homeHeroImageSmall": homeHeroImageSmall.asset->url,
  homeCta,
  homeSecondaryCta,
  promoLabel,
  promoTitle,
  promoText,
  promoWhatsappMessage,
  directBenefits
`;

const apartmentPageQuery = `{
  "apartment": *[_type == "apartment" && slug.current == $slug][0]{${apartmentFields}},
  "settings": *[_type == "siteSettings"][0]{${settingsFields}},
  "apartments": *[_type == "apartment"] | order(order asc){${apartmentFields}}
}`;
const mainQuery = `{
  "settings": *[_type == "siteSettings"][0]{${settingsFields}},
  "apartments": *[_type == "apartment"] | order(order asc){${apartmentFields}}
}`;

const fallbackApartments: Record<LandingSlug, Apartment> = {
  "imperio-1": apartment,
  "imperio-2": apartment2,
  "imperio-3": apartment3
};

const fallbackLandings: Record<LandingSlug, LocalLanding> = {
  "imperio-1": landing,
  "imperio-2": landing2,
  "imperio-3": landing3
};

const slugs: LandingSlug[] = ["imperio-1", "imperio-2", "imperio-3"];

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasPercent(value: unknown): value is string {
  return typeof value === "string" && /^\d{1,3}(?:\.\d+)?%$/.test(value.trim());
}

function percentOrFallback(value: string | undefined, fallback: string | undefined) {
  return hasPercent(value) ? value.trim() : fallback;
}

function validItems<T>(items: T[] | undefined, isValid: (item: T) => boolean) {
  return items?.filter(isValid) ?? [];
}

function mergeAddress(fallback: Apartment["address"], incoming?: Partial<Apartment["address"]>) {
  return {
    ...fallback,
    ...Object.fromEntries(Object.entries(incoming ?? {}).filter(([, value]) => hasText(value)))
  };
}

function mergeGeo(fallback: Apartment["geo"], incoming?: Partial<Apartment["geo"]>) {
  return {
    latitude: typeof incoming?.latitude === "number" ? incoming.latitude : fallback.latitude,
    longitude: typeof incoming?.longitude === "number" ? incoming.longitude : fallback.longitude
  };
}

function formatRating(value: number | undefined, fallback: number | string) {
  const rating = typeof value === "number" ? value : Number(String(fallback).replace(",", "."));
  return Number.isFinite(rating) ? rating.toFixed(1).replace(".", ",") : String(fallback);
}

function normalizeMap(fallback: Apartment["map"], incoming?: SanityMap) {
  return {
    ...fallback,
    embed: incoming?.embed || fallback.embed,
    marker: {
      ...fallback.marker,
      x: percentOrFallback(incoming?.markerX, fallback.marker?.x),
      y: percentOrFallback(incoming?.markerY, fallback.marker?.y),
      mobileX: percentOrFallback(incoming?.markerMobileX, fallback.marker?.mobileX),
      mobileY: percentOrFallback(incoming?.markerMobileY, fallback.marker?.mobileY),
      coverOriginalPin: incoming?.coverOriginalPin ?? fallback.marker?.coverOriginalPin,
      coverX: percentOrFallback(incoming?.coverX, fallback.marker?.coverX),
      coverY: percentOrFallback(incoming?.coverY, fallback.marker?.coverY),
      coverMobileX: percentOrFallback(incoming?.coverMobileX, fallback.marker?.coverMobileX),
      coverMobileY: percentOrFallback(incoming?.coverMobileY, fallback.marker?.coverMobileY)
    }
  };
}

function normalizeApartment(doc: SanityApartment | null | undefined, fallback: Apartment, settings?: SanitySettings) {
  if (!doc) {
    return {
      ...fallback,
      brand: settings?.brand || fallback.brand,
      phone: settings?.phone || fallback.phone,
      email: settings?.email || fallback.email
    } as Apartment;
  }

  const gallery = validItems(doc.gallery, (item) => Boolean(item.images?.length)).map((item) => ({
    group: item.group || "Galeria",
    title: item.title || item.group || fallback.shortName,
    detail: item.detail || "",
    images: item.images?.filter(hasText) ?? []
  }));
  const services = doc.services?.filter(hasText);
  const quickFacts = validItems(doc.quickFacts, (item) => hasText(item.label) && hasText(item.value)).map((item) => ({
    label: item.label ?? "",
    value: item.value ?? ""
  }));
  const scores = validItems(doc.scores, (item) => hasText(item.label) && hasText(item.value)).map((item) => ({
    label: item.label ?? "",
    value: item.value ?? ""
  }));
  const reviews = validItems(doc.reviews, (item) => hasText(item.author) && hasText(item.quote)).map((item) => ({
    author: item.author ?? "",
    country: item.country || "",
    quote: item.quote ?? ""
  }));
  const faqs = validItems(doc.faqs, (item) => hasText(item.question) && hasText(item.answer)).map((item) => ({
    question: item.question ?? "",
    answer: item.answer ?? ""
  }));
  const nearby = validItems(doc.nearby, (item) => hasText(item.label) && hasText(item.detail)).map((item) => ({
    label: item.label ?? "",
    detail: item.detail ?? ""
  }));

  return {
    ...fallback,
    brand: settings?.brand || fallback.brand,
    name: doc.name || fallback.name,
    shortName: doc.shortName || doc.displayName || fallback.shortName,
    bookingUrl: doc.bookingUrl || fallback.bookingUrl,
    phone: doc.whatsapp || settings?.phone || fallback.phone,
    email: doc.email || settings?.email || fallback.email,
    address: mergeAddress(fallback.address, doc.address),
    geo: mergeGeo(fallback.geo, doc.geo),
    rating: {
      ...fallback.rating,
      ...Object.fromEntries(Object.entries(doc.rating ?? {}).filter(([, value]) => value !== undefined && value !== null && value !== ""))
    },
    scores: scores.length ? scores : fallback.scores,
    quickFacts: quickFacts.length ? quickFacts : fallback.quickFacts,
    description: doc.description || fallback.description,
    services: services?.length ? services : fallback.services,
    nearby: nearby.length ? nearby : fallback.nearby,
    reviews: reviews.length ? reviews : fallback.reviews,
    gallery: gallery.length ? gallery : fallback.gallery,
    map: normalizeMap(fallback.map, doc.map),
    faqs: faqs.length ? faqs : fallback.faqs
  } as Apartment;
}

function normalizeLanding(doc: SanityApartment | null | undefined, fallback: LocalLanding, apartmentView: Apartment) {
  return {
    ...fallback,
    title: doc?.seoTitle || fallback.title,
    metaDescription: doc?.seoDescription || fallback.metaDescription,
    navLabel: doc?.navLabel || fallback.navLabel,
    heroWord: doc?.heroWord || doc?.displayName || apartmentView.shortName || fallback.heroWord,
    eyebrow: doc?.eyebrow || fallback.eyebrow,
    headline: doc?.headline || fallback.headline,
    intro: doc?.intro || fallback.intro,
    cta: doc?.cta || fallback.cta,
    heroImage: doc?.heroImage || fallback.heroImage,
    heroImageSmall: doc?.heroImageSmall || fallback.heroImageSmall,
    secondaryHref: apartmentView.bookingUrl || fallback.secondaryHref
  };
}

function normalizeCard(doc: SanityApartment | undefined, view: Apartment, fallback: ApartmentCardView, slug: LandingSlug) {
  return {
    ...fallback,
    slug,
    name: doc?.displayName || view.shortName || fallback.name,
    subtitle: doc?.subtitle || fallback.subtitle,
    rating: formatRating(view.rating.value, fallback.rating),
    image: doc?.mainImage || doc?.heroImage || fallback.image,
    description: doc?.cardDescription || fallback.description,
    facts: doc?.cardFacts?.filter(hasText).length ? doc.cardFacts.filter(hasText) : fallback.facts,
    bookingHref: view.bookingUrl || fallback.bookingHref
  };
}

function buildGalleryGroups(apartmentViews: Apartment[], cards: ApartmentCardView[]) {
  return apartmentViews.map((view, index) => {
    const card = cards[index];
    const images = view.gallery
      .flatMap((group) => group.images.map((src) => ({ src, label: group.title || group.group })))
      .slice(0, 3)
      .map((image, imageIndex) => ({ ...image, featured: imageIndex === 0 }));

    return {
      id: `main-gallery-${card.slug}`,
      name: card.name,
      subtitle: card.subtitle,
      href: card.href,
      images: images.length ? images : [{ src: card.image, label: card.subtitle, featured: true }]
    };
  });
}

function bySlug(docs: SanityApartment[] | undefined) {
  const map = new Map<LandingSlug, SanityApartment>();
  for (const doc of docs ?? []) {
    if (slugs.includes(doc.slug as LandingSlug)) {
      map.set(doc.slug as LandingSlug, doc);
    }
  }
  return map;
}

function normalizePromo(settings?: SanitySettings) {
  return {
    ...promo,
    label: settings?.promoLabel || promo.label,
    title: settings?.promoTitle || promo.title,
    text: settings?.promoText || promo.text,
    whatsappMessage: settings?.promoWhatsappMessage || promo.whatsappMessage
  };
}

function normalizeBenefits(settings?: SanitySettings) {
  const benefits = settings?.directBenefits?.filter((item) => hasText(item.title) && hasText(item.text)).map((item) => ({
    title: item.title ?? "",
    text: item.text ?? ""
  }));

  return benefits?.length ? benefits : directBenefits;
}

function normalizeCards(settings: SanitySettings | undefined, docs: SanityApartment[] | undefined) {
  const sanityApartmentMap = bySlug(settings?.apartments?.length ? settings.apartments : docs);
  const apartmentViews = slugs.map((slug) => normalizeApartment(sanityApartmentMap.get(slug), fallbackApartments[slug], settings));
  const cards = slugs.map((slug, index) =>
    normalizeCard(sanityApartmentMap.get(slug), apartmentViews[index], apartmentCards[index] as ApartmentCardView, slug)
  );

  return { sanityApartmentMap, apartmentViews, cards };
}

export async function getApartmentPageContent(slug: LandingSlug) {
  const fallbackApartment = fallbackApartments[slug];
  const fallbackLanding = fallbackLandings[slug];
  const data = await sanityFetch<{ apartment?: SanityApartment | null; settings?: SanitySettings; apartments?: SanityApartment[] }>(
    apartmentPageQuery,
    { slug }
  );
  const doc = data?.apartment;
  const settings = data?.settings;
  const apartmentView = normalizeApartment(doc, fallbackApartment, settings);
  const { cards } = normalizeCards(settings, data?.apartments);
  const pagePromo = normalizePromo(settings);

  return {
    apartment: apartmentView,
    landing: normalizeLanding(doc, fallbackLanding, apartmentView),
    apartmentCards: cards.length ? cards : apartmentCards,
    directBenefits: normalizeBenefits(settings),
    promo: pagePromo,
    whatsappHref: buildWhatsappHref(apartmentView.phone, `${pagePromo.whatsappMessage}${apartmentView.shortName}. `)
  };
}

export async function getMainPageContent() {
  const data = await sanityFetch<{ settings?: SanitySettings; apartments?: SanityApartment[] }>(mainQuery);
  const settings = data?.settings;
  const { apartmentViews, cards } = normalizeCards(settings, data?.apartments);
  const mainPromo = normalizePromo(settings);
  const businessApartment = {
    ...apartmentViews[0],
    brand: settings?.brand || apartmentViews[0].brand,
    phone: settings?.phone || apartmentViews[0].phone,
    email: settings?.email || apartmentViews[0].email
  } as Apartment;

  return {
    apartment: businessApartment,
    apartments: apartmentViews.length ? apartmentViews : apartments,
    apartmentCards: cards.length ? cards : apartmentCards,
    directBenefits: normalizeBenefits(settings),
    galleryGroups: buildGalleryGroups(apartmentViews, cards),
    mainLanding: {
      ...mainLanding,
      title: settings?.homeSeoTitle || mainLanding.title,
      metaDescription: settings?.homeSeoDescription || mainLanding.metaDescription,
      heroWord: settings?.homeHeroWord || mainLanding.heroWord,
      eyebrow: settings?.homeEyebrow || mainLanding.eyebrow,
      headline: settings?.homeHeadline || mainLanding.headline,
      intro: settings?.homeIntro || mainLanding.intro,
      heroImage: settings?.homeHeroImage || mainLanding.heroImage,
      heroImageSmall: settings?.homeHeroImageSmall || mainLanding.heroImageSmall,
      cta: settings?.homeCta || mainLanding.cta,
      secondaryCta: settings?.homeSecondaryCta || mainLanding.secondaryCta
    },
    promo: mainPromo,
    whatsappHref: settings ? buildWhatsappHref(settings.phone || businessApartment.phone, mainPromo.whatsappMessage) : fallbackWhatsappHref
  };
}
