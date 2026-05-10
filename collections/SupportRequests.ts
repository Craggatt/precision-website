import { CollectionConfig } from "payload";

export const SupportRequests: CollectionConfig = {
  slug: "support-requests",
  admin: {
    useAsTitle: "venueName",
    defaultColumns: ["venueName", "contactName", "email", "signDescription", "createdAt"],
  },
  fields: [
    {
      name: "venueName",
      type: "text",
      required: true,
    },
    {
      name: "contactName",
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
      required: true,
    },
    {
      name: "signDescription",
      type: "text",
      required: true,
    },
    {
      name: "serialNumber",
      type: "text",
      required: false,
    },
    {
      name: "faultDescription",
      type: "textarea",
      required: true,
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
          label: "In Progress",
          value: "in_progress",
        },
        {
          label: "Awaiting Parts",
          value: "awaiting_parts",
        },
        {
          label: "Resolved",
          value: "resolved",
        },
        {
          label: "Closed",
          value: "closed",
        },
      ],
    },
    {
      name: "priority",
      type: "select",
      required: false,
      defaultValue: "normal",
      options: [
        {
          label: "Low",
          value: "low",
        },
        {
          label: "Normal",
          value: "normal",
        },
        {
          label: "High",
          value: "high",
        },
        {
          label: "Urgent",
          value: "urgent",
        },
      ],
    },
  ],
};
