import { useEffect, useReducer, useRef } from 'react';

/**
 * Returns the (x, y) center of `elRef` relative to `containerRef`.
 * Re-renders only when the position changes by more than 1px on either axis.
 *
 * Used by the Act 3 UI scenes to position the animated cursor over targets
 * (buttons, checkboxes, etc.) regardless of layout.
 */
export function useElementCenter(
  elRef: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const posRef = useRef({ x: 0, y: 0, ready: false });
  const [, rerender] = useReducer(n => n + 1, 0);

  useEffect(() => {
    let id: number;
    const update = () => {
      const el = elRef.current;
      const container = containerRef.current;
      if (el && container) {
        const er = el.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        if (er.width > 0 && er.height > 0) {
          const nx = er.left - cr.left + er.width / 2;
          const ny = er.top - cr.top + er.height / 2;
          if (
            !posRef.current.ready ||
            Math.abs(posRef.current.x - nx) > 1 ||
            Math.abs(posRef.current.y - ny) > 1
          ) {
            posRef.current = { x: nx, y: ny, ready: true };
            rerender();
          }
        }
      }
      id = requestAnimationFrame(update);
    };
    id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [elRef, containerRef]);

  return posRef.current;
}
