import * as migration_20260430_033152 from './20260430_033152';
import * as migration_20260506_021812_add_content_collections from './20260506_021812_add_content_collections';

export const migrations = [
  {
    up: migration_20260430_033152.up,
    down: migration_20260430_033152.down,
    name: '20260430_033152',
  },
  {
    up: migration_20260506_021812_add_content_collections.up,
    down: migration_20260506_021812_add_content_collections.down,
    name: '20260506_021812_add_content_collections'
  },
];
