import { Resource, Setter } from "solid-js";

export const sortBy = <T>(
  data: Resource<T[] | undefined>,
  mutate: Setter<T[] | undefined>,
  key: Extract<keyof T, string>
) => {
  let sortKey = "";
  let sortDirection = "DESC";

  return () => {
    if (sortKey === key) {
      if (sortDirection === "DESC") {
        sortDirection = "ASC";
      } else {
        sortDirection = "DESC";
      }
    } else {
      sortDirection = "DESC";
    }

    sortKey = key;
    const sorted = data()?.sort((a, b) => {
      if (sortDirection === "ASC") {
        if (typeof a[key] !== "string" && typeof b[key] !== "string") {
          return Number(a[key]) - Number(b[key]);
        }

        return String(a[key]).localeCompare(String(b[key]));
      }

      if (typeof a[key] !== "string" && typeof b[key] !== "string") {
        return Number(b[key]) - Number(a[key]);
      }

      return String(b[key]).localeCompare(String(a[key]));
    });

    mutate([]);
    mutate(sorted);
  };
};
