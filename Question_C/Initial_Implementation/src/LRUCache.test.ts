import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache;
  const capacity = 3;
  const ttl = 1000; // 1 second for testing

  beforeEach(() => {
    cache = new LRUCache(capacity);
  });

  test('should retrieve inserted items', () => {
    cache.put('key1', 'value1', ttl);
    expect(cache.get('key1')).toBe('value1');
  });

  test('should evict least recently used item', () => {
    cache.put('key1', 'value1', ttl);
    cache.put('key2', 'value2', ttl);
    cache.put('key3', 'value3', ttl);
    cache.put('key4', 'value4', ttl); // This should evict 'key1'

    expect(cache.get('key1')).toBeNull();
    expect(cache.get('key4')).toBe('value4');
  });

  test('should expire items based on TTL', (done) => {
    cache.put('key1', 'value1', ttl);

    setTimeout(() => {
      expect(cache.get('key1')).toBeNull();
      done();
    }, ttl + 1);
  });

  test('should overwrite existing items', () => {
    cache.put('key1', 'value1', ttl);
    cache.put('key1', 'value2', ttl);

    expect(cache.get('key1')).toBe('value2');
  });
});
