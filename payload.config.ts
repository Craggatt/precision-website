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
import { VenueLogos } from "./collections/VenueLogos";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";

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
    Projects,
    Testimonials,
    VenueLogos,
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
      enabled: true,
      collections: {
        media: true,
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
