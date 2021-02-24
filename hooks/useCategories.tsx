import React from "react";
import capitalize from "helpers/capitalize";
import useCollection from "./useCollection";

type useCategoriesReturn = {
  categories: Array<{ label: string; value: string }>;
  tags: Array<{ label: string; value: string }>;
  types: {
    [categoryName: string]: Array<{ label: string; value: string }>;
  };
  all: Array<{ label: string; value: string }>;
};

const useCategories = (): useCategoriesReturn => {
  const { data, loading, error } = useCollection<{
    id: string;
    label: string;
    types: Array<string>;
    tags?: Array<string>;
  }>("categories");

  if (error || !data) return { categories: [], tags: [], types: {}, all: [] };

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
        all: [...state.all, category, ...types, ...tags],
      };
    },
    { categories: [], tags: [], types: {}, all: [] }
  );

  return result;
};

export default useCategories;
