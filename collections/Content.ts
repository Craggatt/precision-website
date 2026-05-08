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
    {
      name: "featureImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "contentSections",
      type: "array",
      required: false,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "tag",
          type: "text",
          required: false,
        },
        {
          name: "shortDescription",
          type: "textarea",
          required: false,
        },
        {
          name: "longDescription",
          type: "richText",
          required: false,
        },
      ],
    },
  ],
};
