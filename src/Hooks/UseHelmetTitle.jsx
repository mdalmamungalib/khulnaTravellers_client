import React from "react";
import { Helmet } from "react-helmet-async";

const UseHelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Khulna Travelers</title>
    </Helmet>
  );
};

export default UseHelmetTitle;
