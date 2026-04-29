import { CollectionConfig } from "payload";

export const VenueLogos: CollectionConfig = {
  slug: "venue-logos",
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: ["media"],
      required: true,
    },
    {
      name: "isFeatured",
      type: "checkbox",
    },
  ],
};
