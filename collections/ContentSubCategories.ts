import { CollectionConfig } from "payload";

export const ContentSubCategories: CollectionConfig = {
  slug: "content-subcategories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "parentCategory",
      type: "relationship",
      relationTo: "content-categories",
    },
  ],
};
