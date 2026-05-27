import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { importExportPlugin } from "@payloadcms/plugin-import-export";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { ProductCategories } from "./collections/ProductCategories";
import { ProductSubCategories } from "./collections/ProductSubCategories";
import { Products } from "./collections/Products";
import { ContentCategories } from "./collections/ContentCategories";
import { ContentSubCategories } from "./collections/ContentSubCategories";
import { Content } from "./collections/Content";
import { VenueLogos } from "./collections/VenueLogos";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { QuoteRequests } from "./collections/QuoteRequests";
import { SupportRequests } from "./collections/SupportRequests";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ProductCategories,
    ProductSubCategories,
    Products,
    ContentCategories,
    ContentSubCategories,
    Content,
    Projects,
    Testimonials,
    VenueLogos,
    ContactSubmissions,
    QuoteRequests,
    SupportRequests,
  ],
  jobs: {
    autoRun: [
      {
        cron: "*/5 * * * *",
        queue: "default",
      },
    ],
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: false, // Temporarily disabled for Vercel deployment
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `https://dlpwfd6kwolf1.cloudfront.net/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION,
      },
    }),
    importExportPlugin({
      collections: [],
    }),
  ],
});
