/* eslint-disable react/prop-types */
import React from "react";
import SearchComponent from "../../components/Search";

const SearchPage = ({ match } : any) => {
  return (
    <>
      <SearchComponent match={match} />
    </>
  );
};

export default SearchPage;
