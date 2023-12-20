import React from "react";
import Sidebar from "@/components/Sidebar";
import "@/styles/page.css";

const Presioname = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="content-page">
        {" "}
        <h1>Ya me presionaste</h1> <br />
      </div>
    </div>
  );
};

export default Presioname;
