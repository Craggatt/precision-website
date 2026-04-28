import { CollectionConfig } from "payload";

export const ProductSubCategories: CollectionConfig = {
  slug: "product-subcategories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "parentCategory",
      type: "relationship",
      relationTo: "product-categories",
    },
  ],
};
