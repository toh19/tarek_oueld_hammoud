# LRU Cache

This TypeScript library provides a lightweight, dead simple implementation of a Geo Distributed Least Recently Used (LRU) Cache with time expiration (2 implementations: one with redis and one without).
## Usage

Example:

```typescript
const cache = new LRUCache(3);
cache.put('key1', 'value1', 10) // 10 seconds TTL
    .then(() => cache.get('key1'))
    .then(value => console.log(value)) // Should log 'value1'
    .catch(err => console.error(err));

```

## Running the Tests
```
npm install
npm test
```

This will execute the test cases defined in the project using Jest. The tests are designed to check various scenarios to ensure the LRUCache & LRUCacheRedis behaves as expected for different version string inputs.

### Integrated features
- [ ] Resilient to network failures or crashes.
- [ ] Near real-time replication of data across Geolocation. Writes need to be in real-time.
- [ ] Data consistency across regions
- [ ] Locality of reference, data should almost always be available from the closest region
- [ ] Flexible Schema
- [x] Cache can expire
