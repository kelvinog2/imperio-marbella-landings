import { createClient } from "@sanity/client";

const projectId =
  import.meta.env.SANITY_PROJECT_ID ??
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ??
  import.meta.env.SANITY_STUDIO_PROJECT_ID ??
  "8vfyivj2";
const dataset =
  import.meta.env.SANITY_DATASET ??
  import.meta.env.PUBLIC_SANITY_DATASET ??
  import.meta.env.SANITY_STUDIO_DATASET ??
  "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2026-07-04";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published"
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.warn("[sanity] Falling back to local content", error);
    return null;
  }
}
