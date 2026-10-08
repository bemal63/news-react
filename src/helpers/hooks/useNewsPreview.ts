import { useEffect, useRef, useState } from "react";
import { getNewsPreview } from "../../api/apiPreview";

export const useNewsPreview = (id: string, fallback: string) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [image, setImage] = useState(fallback);

  useEffect(() => {
    let active = true;
    setImage(fallback);
    const element = ref.current;
    if (!element) return;
    const load = () => {
      getNewsPreview(id).then(preview => {
        if (active && preview) setImage(preview);
      });
    };
    if (!("IntersectionObserver" in window)) {
      load();
      return () => { active = false; };
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [id, fallback]);

  return { ref, image };
};
