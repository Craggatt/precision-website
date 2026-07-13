import { CollectionConfig } from "payload";

export const DemoBookings: CollectionConfig = {
  slug: "demo-bookings",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "venueName", "createdAt"],
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
      name: "venueName",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "mobile",
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
          label: "Booked",
          value: "booked",
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
