import React, { useState, useEffect } from "react";

/**
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 960px
    lg, large: 1280px
    xl, extra-large: 1920px
 */

const queries = {
  xs: "(max-width: 600px)",
  sm: "(max-width: 960px)",
  md: "(max-width: 1280px)",
  lg: "(max-width: 1920px)",
};

const useMediaQuery = (query: "xs" | "sm" | "md" | "lg") => {
  const defaultMatch = window.matchMedia(queries[query]);
  const [match, setMatch] = useState(defaultMatch.matches);

  useEffect(() => {
    const onChange = () => {
      const mediaQuery = queries[query];
      const media = window.matchMedia(mediaQuery);
      setMatch(media.matches);
    };

    window.addEventListener("resize", onChange);

    return () => {
      window.removeEventListener("resize", onChange);
    };
  }, [query]);

  return match;
};

export default useMediaQuery;
