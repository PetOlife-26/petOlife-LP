import { useEffect, useRef } from "react";

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || "0px",
      }
    );

    // Observe the container and all children with .scroll-animate
    const children = node.querySelectorAll(".scroll-animate");
    children.forEach((child) => observer.observe(child));
    if (node.classList.contains("scroll-animate")) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
