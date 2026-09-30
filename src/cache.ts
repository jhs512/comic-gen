/** Bounded LRU by UTF-16 string footprint, including lookup keys. */
export class PanelCache {
  private entries = new Map<
    string,
    { markup: string; height: number; bytes: number }
  >();
  private size = 0;
  constructor(private maxBytes = 2_000_000) {
    if (!Number.isFinite(maxBytes) || maxBytes < 0)
      throw new Error("캐시 크기는 0 이상의 숫자여야 합니다.");
  }
  get bytes() {
    return this.size;
  }
  get(key: string) {
    const value = this.entries.get(key);
    if (value) {
      this.entries.delete(key);
      this.entries.set(key, value);
    }
    return value;
  }
  set(key: string, value: { markup: string; height: number }) {
    const previous = this.entries.get(key);
    if (previous) {
      this.size -= previous.bytes;
      this.entries.delete(key);
    }
    const bytes = (key.length + value.markup.length) * 2;
    if (bytes > this.maxBytes) return;
    while (this.size + bytes > this.maxBytes && this.entries.size) {
      const oldest = this.entries.keys().next().value!;
      this.size -= this.entries.get(oldest)!.bytes;
      this.entries.delete(oldest);
    }
    this.entries.set(key, { ...value, bytes });
    this.size += bytes;
  }
  clear() {
    this.entries.clear();
    this.size = 0;
  }
}
