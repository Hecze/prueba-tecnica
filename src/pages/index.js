import React from "react";
import CountrySelect from "../components/CountrySelect";
import Navbar from "@/components/navbar";
import CountrySearch from "@/components/CountrySearch.jsx";

function Home() {
  return (
    <>
      <Navbar />

      <CountrySearch />
    </>
  );
}

export default Home;
