import { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "profilePicture",
      type: "upload",
      relationTo: ["media"],
      required: false,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      required: false,
    },
    {
      name: "name",
      type: "text",
      required: false,
    },
    {
      name: "position",
      type: "text",
      required: false,
    },
    {
      name: "organisation",
      type: "text",
      required: false,
    },
    {
      name: "quote",
      type: "text",
      required: false,
    },
  ],
};
