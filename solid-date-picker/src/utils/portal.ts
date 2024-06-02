import { onCleanup } from "solid-js";

export type ClickOutsideAccessor = (
  e: MouseEvent,
) => ((e: MouseEvent) => void) | void;

export function clickOutsideSJ(
  el: HTMLElement,
  accessor: ClickOutsideAccessor,
) {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor(e)?.(e);
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
