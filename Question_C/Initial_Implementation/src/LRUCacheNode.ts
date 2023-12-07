export class LRUCacheNode {
  key: string;
  expiry: number;
  next: LRUCacheNode | null;
  prev: LRUCacheNode | null;

  constructor(key: string, ttl: number) {
    this.key = key;
    this.expiry = Date.now() + ttl;
    this.next = null;
    this.prev = null;
  }
}
