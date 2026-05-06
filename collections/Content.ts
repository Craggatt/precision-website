import { CollectionConfig } from "payload";

export const Content: CollectionConfig = {
  slug: "content",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "category",
      type: "relationship",
      relationTo: "content-categories",
      required: true,
    },
    {
      name: "subcategory",
      type: "relationship",
      relationTo: "content-subcategories",
      hasMany: true,
      filterOptions: ({ data }) => {
        if (data?.category) {
          return {
            parentCategory: { equals: data.category },
          };
        }
        return true;
      },
    },
    { name: "richText", type: "richText", required: true },
  ],
};
