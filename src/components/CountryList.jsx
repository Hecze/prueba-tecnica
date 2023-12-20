import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countriesInPage }) => {
  const [countrySelected, setCountrySelected] = useState();

  useEffect(() => {
    if (countrySelected) {
      document.getElementById("info").scrollIntoView({ behavior: "smooth" });
    }
  }, [countrySelected]);

  return (
    <>
      {" "}
      <ul className="countryList">
        {countriesInPage.map((country) => (
          <>
            <li key={country.code}>
              {" "}
              <div
                className="countryCard"
                onClick={() => {
                  setCountrySelected(country);
                }}
              >
                <div className="">
                  <Image
                    src={country.image}
                    alt={country.name}
                    width={400}
                    height={300}
                    className="countryImg"
                  />
                </div>
                <div className="countryInfo">
                  <h2>{country.name}</h2>
                  <p>{country.continent}</p>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
      <div className="country-modal">
        {countrySelected && <CountryInfo country={countrySelected} />}
      </div>
    </>
  );
};

export default CountryList;
