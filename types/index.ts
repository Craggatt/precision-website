export interface PrecisionSignsCatalog {
  company: string;
  website: string;
  abn: string;
  address: string;
  phone: string;
  email: string;
  scraped_date: string;
  total_products: number;
  products: Product[];
}

export interface Product {
  name: string;
  category: ProductCategory;
  subcategory: string | null;
  url: string;
  feature_image: string;
  additional_images?: string[];
  description: string;
  features: string[];
  led_panel_type?: string;
  led_panel_options?: string[];
  lighting_system?: string;
  display_type?: string;
  finish?: string;
  size?: string;
  width?: string;
  mount_options?: string[];
  pricing?: string;
  warranty?: string;
  status?: string;
  video_id?: string;
  requirements?: string;
  service_and_support?: string[];
  measurement_diagram?: string;
  power_diagram?: string;
  product_options?: ProductOption[];
  display_modes?: DisplayMode[];
}

export interface ProductOption {
  name: string;
  description: string;
}

export interface DisplayMode {
  mode: string;
  description: string;
  status?: string;
}

export type ProductCategory =
  | "Overbank Signage"
  | "Entry Displays"
  | "Screens"
  | "Infills"
  | "Jackpot History"
  | "Large Screens";

export interface CaseStudy {
  name: string;
  slug: string;
  feature_image: string;
  images: string[];
  video: string | null;
  description: string;
}
