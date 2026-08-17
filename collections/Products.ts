import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'code', type: 'text', required: true },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: ['media'],
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'product-subcategories',
      hasMany: true, // if a product can have multiple subcategories
      filterOptions: ({ data }) => {
        if (data?.category) {
          return {
            parentCategory: { equals: data.category },
          };
        }
        return true;
      },
    },
    {
      name: 'model',
      type: 'upload',
      relationTo: ['media'],
      required: false,
    },
    { name: 'description', type: 'richText', required: true },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text' }],
    },
    {
      name: 'requirements',
      type: 'group',
      fields: [
        { name: 'powerOutlets', type: 'number', required: false },
        { name: 'ethernetPorts', type: 'number', required: false },
        { name: 'maxAmps', type: 'number', required: false },
        { name: 'voltage', type: 'number', required: false },
        {
          name: 'design',
          type: 'upload',
          relationTo: ['media'],
          required: false,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: ['media'],
      required: false,
      hasMany: true,
    },
  ],
};
