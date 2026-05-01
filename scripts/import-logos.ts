import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";
import path from "path";
import csv from "csvtojson";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const run = async () => {
  const payload = await getPayload({ config });
  const rows = await csv().fromFile(path.resolve(__dirname, "venue-logos.csv"));

  for (const row of rows) {
    try {
      await payload.create({
        collection: "venue-logos",
        data: {
          name: row.name,
          image: {
            relationTo: "media",
            value: Number(row.image),
          },
          isFeatured: row.isFeatured === "true",
        },
      });
      console.log(`Created: ${row.name}`);
    } catch (e) {
      console.error(`Failed: ${row.name}`, e.message);
    }
  }

  console.log("Done!");
  process.exit(0);
};

run();
