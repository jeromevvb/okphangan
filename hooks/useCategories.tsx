import React from "react";
import { useCollection } from "@nandorojo/swr-firestore";
import capitalize from "helpers/capitalize";

type Categories = {
  label: string;
  value: string;
};

type Tag = {
  label: string;
  value: string;
};

type Types = Array<{
  label: string;
  value: string;
}>;

const useCategories = (): {
  categories: Array<Categories>;
  types: Array<Types>;
  tags: Array<Tag>;
} => {
  const { data, error } = useCollection<{
    label: string;
    tags?: Array<string>;
    types: Array<string>;
  }>("categories");

  if (error || !data) return { categories: [], tags: [], types: [] };

  const categories = data?.map((entry) => {
    return { label: entry.label, value: entry.id };
  });

  const types = data?.reduce((state, entry) => {
    const types = entry.types.map((type) => ({
      label: capitalize(type),
      value: type,
    }));

    return {
      ...state,
      [entry.id]: types,
    };
  }, {});

  const tags = data?.reduce((state, entry) => {
    const types = entry.types.map((type) => ({
      label: capitalize(type),
      value: type,
    }));

    const tags =
      entry.tags?.map((tag) => ({
        label: capitalize(tag),
        value: tag,
      })) || [];

    return [...state, ...tags, ...types];
  }, []);
  //@ts-ignore
  // const uniqueTags = [...new Set(tags)];

  return { categories, tags, types };
};

export default useCategories;
