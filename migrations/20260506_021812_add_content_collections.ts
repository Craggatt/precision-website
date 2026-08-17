import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "content_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content_categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "content_subcategories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_category_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"rich_text" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"content_subcategories_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "content_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "content_subcategories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "content_id" integer;
  ALTER TABLE "content_categories_rels" ADD CONSTRAINT "content_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_categories_rels" ADD CONSTRAINT "content_categories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_subcategories" ADD CONSTRAINT "content_subcategories_parent_category_id_content_categories_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."content_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_category_id_content_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."content_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_content_subcategories_fk" FOREIGN KEY ("content_subcategories_id") REFERENCES "public"."content_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "content_categories_slug_idx" ON "content_categories" USING btree ("slug");
  CREATE INDEX "content_categories_updated_at_idx" ON "content_categories" USING btree ("updated_at");
  CREATE INDEX "content_categories_created_at_idx" ON "content_categories" USING btree ("created_at");
  CREATE INDEX "content_categories_rels_order_idx" ON "content_categories_rels" USING btree ("order");
  CREATE INDEX "content_categories_rels_parent_idx" ON "content_categories_rels" USING btree ("parent_id");
  CREATE INDEX "content_categories_rels_path_idx" ON "content_categories_rels" USING btree ("path");
  CREATE INDEX "content_categories_rels_media_id_idx" ON "content_categories_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "content_subcategories_slug_idx" ON "content_subcategories" USING btree ("slug");
  CREATE INDEX "content_subcategories_parent_category_idx" ON "content_subcategories" USING btree ("parent_category_id");
  CREATE INDEX "content_subcategories_updated_at_idx" ON "content_subcategories" USING btree ("updated_at");
  CREATE INDEX "content_subcategories_created_at_idx" ON "content_subcategories" USING btree ("created_at");
  CREATE UNIQUE INDEX "content_slug_idx" ON "content" USING btree ("slug");
  CREATE INDEX "content_category_idx" ON "content" USING btree ("category_id");
  CREATE INDEX "content_updated_at_idx" ON "content" USING btree ("updated_at");
  CREATE INDEX "content_created_at_idx" ON "content" USING btree ("created_at");
  CREATE INDEX "content_rels_order_idx" ON "content_rels" USING btree ("order");
  CREATE INDEX "content_rels_parent_idx" ON "content_rels" USING btree ("parent_id");
  CREATE INDEX "content_rels_path_idx" ON "content_rels" USING btree ("path");
  CREATE INDEX "content_rels_content_subcategories_id_idx" ON "content_rels" USING btree ("content_subcategories_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_categories_fk" FOREIGN KEY ("content_categories_id") REFERENCES "public"."content_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_subcategories_fk" FOREIGN KEY ("content_subcategories_id") REFERENCES "public"."content_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_content_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("content_categories_id");
  CREATE INDEX "payload_locked_documents_rels_content_subcategories_id_idx" ON "payload_locked_documents_rels" USING btree ("content_subcategories_id");
  CREATE INDEX "payload_locked_documents_rels_content_id_idx" ON "payload_locked_documents_rels" USING btree ("content_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "content_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_categories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_subcategories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "content_categories" CASCADE;
  DROP TABLE "content_categories_rels" CASCADE;
  DROP TABLE "content_subcategories" CASCADE;
  DROP TABLE "content" CASCADE;
  DROP TABLE "content_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_content_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_content_subcategories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_content_fk";
  
  DROP INDEX "payload_locked_documents_rels_content_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_content_subcategories_id_idx";
  DROP INDEX "payload_locked_documents_rels_content_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "content_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "content_subcategories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "content_id";`)
}
