import type { Media } from "@/payload-types";

export interface MenuItem {
  id: string | number;
  name: string;
  slug: string;
  thumbnailUrl: string | null;
  subcategories: { name: string; items: { name: string; slug: string }[] }[];
}

interface CategoryLike {
  id: string | number;
  name: string;
  slug: string;
  thumbnail: { value: unknown };
}

interface ItemLike {
  name: string;
  slug: string;
  category: { id: string | number } | string | number;
}

export function buildMenuData<C extends CategoryLike, I extends ItemLike>(
  categories: C[],
  items: I[],
  getSubcategories: (item: I) => Array<{ name: string } | string | number> | null | undefined,
  fallbackSubName = "General",
): MenuItem[] {
  return categories.map((cat) => {
    const thumb = cat.thumbnail.value;
    const thumbnailUrl = typeof thumb === "object" && thumb ? ((thumb as Media).url ?? null) : null;

    const inCategory = items.filter((item) => {
      const c = item.category;
      return typeof c === "object" ? c.id === cat.id : c === cat.id;
    });

    const subMap = new Map<string, { name: string; slug: string }[]>();
    for (const item of inCategory) {
      const subs = getSubcategories(item);
      const first = subs?.[0];
      const subName =
        first && typeof first === "object" && "name" in first ? first.name : fallbackSubName;
      const list = subMap.get(subName) ?? [];
      list.push({ name: item.name, slug: item.slug });
      subMap.set(subName, list);
    }

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      thumbnailUrl,
      subcategories: Array.from(subMap, ([name, items]) => ({ name, items })),
    };
  });
}