import React from "react";
import CountrySelect from "../components/CountrySelect";
import CountrySearch from "@/components/CountrySearch.jsx";
import Sidebar from "@/components/Sidebar";

function Home() {
  return (
    <>
      <Sidebar />

      <CountrySearch />
    </>
  );
}

export default Home;
