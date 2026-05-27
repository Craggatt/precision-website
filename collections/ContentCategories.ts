import { CollectionConfig } from "payload";

export const ContentCategories: CollectionConfig = {
  slug: "content-categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "text", required: true },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: ["media"],
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: ["media"],
      required: true,
    },
  ],
};
