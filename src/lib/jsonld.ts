import { apartment as defaultApartment, baseUrl, type Apartment, type LandingSlug } from "@/data/landings";

type Landing = {
  slug: LandingSlug;
  title: string;
  metaDescription: string;
  heroImage: string;
};

const absolute = (path: string) => new URL(path, baseUrl).toString();

function getFactNumber(apartment: Apartment, keyword: string, fallback: number) {
  const fact = apartment.quickFacts.find((item) => item.label.toLowerCase().includes(keyword));
  const value = Number.parseInt(fact?.value.replace(/[^\d]/g, "") ?? "", 10);
  return Number.isFinite(value) ? value : fallback;
}

export function buildJsonLd(landing: Landing, apartment: Apartment = defaultApartment) {
  const pageUrl = `${baseUrl}/${landing.slug}/`;
  const images = apartment.gallery.flatMap((item) => item.images).map(absolute);
  const floorSize = getFactNumber(apartment, "superficie", 65);
  const bathrooms = getFactNumber(apartment, "ba", 1);
  const bedrooms = getFactNumber(apartment, "dorm", 1);
  const occupancy = getFactNumber(apartment, "hu", getFactNumber(apartment, "adultos", 4));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Apartment",
      "@id": `${pageUrl}#apartment`,
      name: apartment.name,
      description: apartment.description,
      url: pageUrl,
      image: images,
      address: {
        "@type": "PostalAddress",
        streetAddress: apartment.address.street,
        addressLocality: apartment.address.city,
        addressRegion: apartment.address.region,
        postalCode: apartment.address.postalCode,
        addressCountry: "ES"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: apartment.geo.latitude,
        longitude: apartment.geo.longitude
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: floorSize,
        unitCode: "MTK"
      },
      numberOfBathroomsTotal: bathrooms,
      numberOfBedrooms: bedrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: occupancy,
        unitText: "huespedes"
      },
      amenityFeature: apartment.services.map((service) => ({
        "@type": "LocationFeatureSpecification",
        name: service,
        value: true
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: apartment.rating.value,
        bestRating: apartment.rating.best,
        reviewCount: apartment.rating.comments
      },
      review: apartment.reviews.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.author
        },
        reviewBody: review.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: apartment.rating.value,
          bestRating: apartment.rating.best
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `${pageUrl}#business`,
      name: apartment.brand,
      url: pageUrl,
      telephone: apartment.phone,
      email: apartment.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: apartment.address.street,
        addressLocality: apartment.address.city,
        addressRegion: apartment.address.region,
        postalCode: apartment.address.postalCode,
        addressCountry: "ES"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: apartment.geo.latitude,
        longitude: apartment.geo.longitude
      },
      makesOffer: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Accommodation",
          name: apartment.name,
          description: landing.metaDescription
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "@id": `${pageUrl}#gallery`,
      name: `Galería de ${apartment.name}`,
      image: images.map((image, index) => ({
        "@type": "ImageObject",
        contentUrl: image,
        position: index + 1
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${pageUrl}#location`,
      name: apartment.address.full,
      address: apartment.address.full,
      geo: {
        "@type": "GeoCoordinates",
        latitude: apartment.geo.latitude,
        longitude: apartment.geo.longitude
      },
      containedInPlace: {
        "@type": "City",
        name: "Marbella"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: apartment.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Apartamentos Imperio",
          item: baseUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: landing.title,
          item: pageUrl
        }
      ]
    }
  ];
}
