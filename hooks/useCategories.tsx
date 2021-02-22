import React from "react";
import capitalize from "helpers/capitalize";
import useCollection from "./useCollection";

const useCategories = () => {
  const { data, loading, error } = useCollection<{
    id: string;
    label: string;
    types: Array<string>;
    tags?: Array<string>;
  }>("categories");

  if (error || !data) return { categories: [], tags: [], types: [] };

  const result = data.reduce(
    (state, entry) => {
      const category = { label: entry.label, value: entry.id };

      const types = entry.types.map((type) => ({
        label: capitalize(type),
        value: type,
      }));

      const tags =
        entry.tags?.map((tag) => ({
          label: capitalize(tag),
          value: tag,
        })) || [];

      return {
        ...state,
        categories: [...state.categories, category],
        types: { ...state.types, [entry.id]: types },
        tags: [...state.tags, ...types, ...tags],
      };
    },
    { categories: [], tags: [], types: [] }
  );

  return result;
};

export default useCategories;
