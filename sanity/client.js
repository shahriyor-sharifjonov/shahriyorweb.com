import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  token: process.env.SANITY_STUDIO_API_PROJECT_TOKEN,
  apiVersion: "2022-03-25",
  useCdn: false
});