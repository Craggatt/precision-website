import { CollectionConfig } from "payload";

export const WaitingList: CollectionConfig = {
  slug: "waiting-list",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "company", "status", "createdAt"],
  },
  fields: [
    {
      name: "name",
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
      name: "company",
      type: "text",
      required: false,
    },
    {
      name: "position",
      type: "text",
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
          label: "Contacted",
          value: "contacted",
        },
        {
          label: "Completed",
          value: "completed",
        },
      ],
    },
  ],
};
