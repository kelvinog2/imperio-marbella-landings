import { createClient } from "@sanity/client";

export type AvailabilityCalendar = {
  updatedAt: string;
  occupied: string[];
  minStay: number;
};

export const hasSanityConfig = Boolean(process.env.SANITY_PROJECT_ID);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || "production",
      apiVersion: "2026-07-04",
      useCdn: false
    })
  : null;

export async function getAvailability(apartmentSlug: string): Promise<AvailabilityCalendar> {
  if (!sanityClient) {
    return {
      updatedAt: "2026-07-04",
      minStay: 2,
      occupied: ["2026-07-12", "2026-07-13", "2026-07-14", "2026-08-02", "2026-08-03"]
    };
  }

  const data = await sanityClient.fetch<AvailabilityCalendar | null>(
    `*[_type == "availabilityCalendar" && apartmentSlug == $apartmentSlug][0]{
      updatedAt,
      occupied,
      minStay
    }`,
    { apartmentSlug }
  );

  return (
    data || {
      updatedAt: "2026-07-04",
      minStay: 2,
      occupied: []
    }
  );
}
