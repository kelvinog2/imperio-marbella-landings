import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/deskStructure";
import { templates } from "./sanity/templates";

export default defineConfig({
  name: "imperio-marbella",
  title: "Apartamentos Imperio",

  projectId: "8vfyivj2",
  dataset: "production",

  plugins: [
    structureTool({ structure: deskStructure })
  ],

  schema: {
    types: schemaTypes,
    templates
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType === "siteSettings") {
        return prev.filter((action) => !["delete", "duplicate"].includes(action.action ?? ""));
      }

      return prev;
    }
  }
});
