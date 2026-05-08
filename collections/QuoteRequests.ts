import { CollectionConfig } from "payload";

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "products", "createdAt"],
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: false,
    },
    {
      name: "products",
      type: "array",
      required: false,
      fields: [
        {
          name: "productSlug",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "additionalInfo",
      type: "textarea",
      required: false,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        {
          label: "New",
          value: "new",
        },
        {
          label: "Quote Sent",
          value: "quote_sent",
        },
        {
          label: "In Progress",
          value: "in_progress",
        },
        {
          label: "Completed",
          value: "completed",
        },
        {
          label: "Declined",
          value: "declined",
        },
      ],
    },
  ],
};
