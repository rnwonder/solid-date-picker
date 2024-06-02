import { CustomAccessor } from "./generate";

export const getAccessorValue = <T>(accessor: CustomAccessor<T>): T => {
  return typeof accessor === "function" ? (accessor as () => T)() : accessor;
};
