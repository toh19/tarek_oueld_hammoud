import { createClient } from 'redis';
import { LRUCacheNode } from './LRUCacheNode';

export class LRUCacheRedis {
  private capacity: number;
  private cache: Map<string, LRUCacheNode>;
  private head: LRUCacheNode | null = null;
  private tail: LRUCacheNode | null = null;
  private client;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.client = createClient();
    this.client.connect();
  }

  async get(key: string): Promise<any> {
    try {
      const value = await this.client.get(key);
      if (!value) return null;

      const node = this.cache.get(key);
      if (!node) return null;

      if (node.expiry < Date.now()) {
        this.removeNode(node);
        return null;
      }

      this.moveToFront(node);
      return value;
    } catch (err) {
      console.error(err);
    }
  }

  async put(key: string, value: string, ttl: number): Promise<void> {
    try {
      await this.client.set(key, value, { EX: ttl });

      let node = this.cache.get(key);
      if (node) {
        node.expiry = Date.now() + ttl;
        this.moveToFront(node);
      } else {
        if (this.cache.size === this.capacity) {
          this.removeLRUNode();
        }

        node = new LRUCacheNode(key, ttl);
        this.cache.set(key, node);
        this.moveToFront(node);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private removeNode(node: LRUCacheNode): void {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;

    this.cache.delete(node.key);
  }

  private removeLRUNode(): void {
    if (this.tail) {
      this.removeNode(this.tail);
    }
  }

  private moveToFront(node: LRUCacheNode): void {
    if (node === this.head) return;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }
}
