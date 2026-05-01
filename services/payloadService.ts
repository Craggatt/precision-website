import { getPayload } from "payload";
import config from "@/payload.config";
import { Product, Testimonial, Project, VenueLogo, ProductCategory } from "@/payload-types";

async function getPayloadInstance() {
  return getPayload({ config });
}

export const payloadService = {
  getProducts: async (): Promise<Product[]> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({ collection: "products", depth: 2, limit: 100 });
    return result.docs as Product[];
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({ collection: "testimonials", depth: 2, limit: 100 });
    return result.docs as Testimonial[];
  },

  getProjects: async (): Promise<Project[]> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({ collection: "projects", depth: 2, limit: 100 });
    return result.docs as Project[];
  },

  getVenueLogos: async (): Promise<VenueLogo[]> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({ collection: "venue-logos", depth: 2, limit: 100 });
    return result.docs as VenueLogo[];
  },

  getProductCategories: async (): Promise<ProductCategory[]> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({ collection: "product-categories", depth: 2, limit: 100 });
    return result.docs as ProductCategory[];
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });
    return (result.docs[0] as Product) ?? null;
  },
};
