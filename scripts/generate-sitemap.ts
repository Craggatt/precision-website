import { config as dotenvConfig } from 'dotenv';
import { getPayload } from 'payload';
import fs from 'fs';
import path from 'path';

// Load environment variables first
dotenvConfig();

async function generateSitemap() {
  const configModule = await import('../payload.config.js');
  const config = configModule.default;

  const payload = await getPayload({ config });

  // Base URL
  const baseUrl = 'https://precisionsigns.com.au';

  // Static routes
  const staticRoutes = [
    '',
    '/contact',
    '/products',
    '/content',
    '/service-support',
  ];

  // Fetch all products
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
  });

  // Fetch all content items
  const content = await payload.find({
    collection: 'content',
    limit: 1000,
    pagination: false,
  });

  // Generate all URLs
  const urls: string[] = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    urls.push(`${baseUrl}${route}`);
  });

  // Add dynamic product routes
  products.docs.forEach((product: any) => {
    if (product.slug) {
      urls.push(`${baseUrl}/products/${product.slug}`);
    }
  });

  // Add dynamic content routes
  content.docs.forEach((contentItem: any) => {
    if (contentItem.slug) {
      urls.push(`${baseUrl}/content/${contentItem.slug}`);
    }
  });

  // Write sitemap.txt
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.txt');
  fs.writeFileSync(sitemapPath, urls.join('\n'));

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📝 Total URLs: ${urls.length}`);
  console.log(`📍 Location: ${sitemapPath}`);
  console.log(`\nURLs included:`);
  console.log(`- ${staticRoutes.length} static routes`);
  console.log(`- ${products.docs.length} product pages`);
  console.log(`- ${content.docs.length} content pages`);

  process.exit(0);
}

generateSitemap().catch((error) => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});
