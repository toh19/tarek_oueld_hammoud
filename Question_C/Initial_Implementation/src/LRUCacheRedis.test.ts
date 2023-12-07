import { jest } from '@jest/globals'; // Import jest from '@jest/globals'
import { LRUCacheRedis } from './LRUCacheRedis';

jest.mock('redis'); // Mock the 'redis' module

describe('LRUCacheRedis', () => {
  let cache: LRUCacheRedis;

  beforeEach(() => {
    cache = new LRUCacheRedis(3);
  });

  test('should store and retrieve an item', async () => {
    await cache.put('key1', 'value1', 10); // 10 seconds TTL
    const value = await cache.get('key1');
    expect(value).toBe('value1');
  });

  test('should evict the least recently used item', async () => {
    await cache.put('key1', 'value1', 10);
    await cache.put('key2', 'value2', 10);
    await cache.put('key3', 'value3', 10);
    await cache.put('key4', 'value4', 10); // This should evict 'key1'

    const value = await cache.get('key1');
    expect(value).toBeNull();
  });

  test('should expire items based on TTL', async () => {
    jest.useFakeTimers();

    await cache.put('key1', 'value1', 1); // 1 second TTL

    // Advance timer by 1 second + some extra time (e.g., 200 milliseconds)
    jest.advanceTimersByTime(1200); // 1.2 seconds

    const value = await cache.get('key1');
    expect(value).toBeNull();

    jest.useRealTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
