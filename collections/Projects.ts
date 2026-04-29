import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: ["media"],
      required: true,
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: ["media"],
      required: false,
      hasMany: true,
    },
    { name: "videoUrl", type: "text", required: false },
  ],
};
