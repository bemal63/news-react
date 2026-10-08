import axios from "axios";

const previews = new Map<string, Promise<string | null>>();
const queue: (() => void)[] = [];
let activeRequests = 0;

const runQueue = () => {
  while (activeRequests < 3 && queue.length) queue.shift()!();
};

export const getNewsPreview = (id: string): Promise<string | null> => {
  const existing = previews.get(id);
  if (existing) return existing;
  const request = new Promise<string | null>((resolve) => {
    queue.push(() => {
      activeRequests += 1;
      (async () => {
        try {
          const { data } = await axios.get<{ image: string | null }>(`/api/articles/${encodeURIComponent(id)}?preview=1`, { timeout: 22000 });
          resolve(data.image);
        } catch {
          previews.delete(id);
          resolve(null);
        } finally {
          activeRequests -= 1;
          runQueue();
        }
      })();
    });
  });
  if (previews.size >= 80) previews.delete(previews.keys().next().value!);
  previews.set(id, request);
  runQueue();
  return request;
};
