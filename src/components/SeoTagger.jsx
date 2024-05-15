import React from "react";
import { Helmet } from "react-helmet";

const SeoTagger = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SeoTagger;
