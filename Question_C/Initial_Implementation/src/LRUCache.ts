class LRUCacheNode {
  key: string;
  value: any;
  expiry: number;
  next: LRUCacheNode | null = null;
  prev: LRUCacheNode | null = null;

  constructor(key: string, value: any, ttl: number) {
    this.key = key;
    this.value = value;
    this.expiry = Date.now() + ttl;
  }
}

export class LRUCache {
  private capacity: number;
  private cache: Map<string, LRUCacheNode>;
  private head: LRUCacheNode | null = null;
  private tail: LRUCacheNode | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: string): any {
    const node = this.cache.get(key);
    if (!node) return null;
    if (node.expiry < Date.now()) {
      this.removeNode(node);
      return null;
    }
    this.moveToFront(node);
    return node.value;
  }

  put(key: string, value: any, ttl: number): void {
    let node = this.cache.get(key);
    if (node) {
      node.value = value;
      node.expiry = Date.now() + ttl;
      this.moveToFront(node);
      return;
    }

    if (this.cache.size === this.capacity) {
      this.removeLRUNode();
    }

    const newNode = new LRUCacheNode(key, value, ttl);
    this.cache.set(key, newNode);
    this.moveToFront(newNode);
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
