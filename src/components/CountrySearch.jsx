import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import { FiSearch } from "react-icons/fi";
import "@/styles/CountrySearch.css";
import Image from "next/image";
import CountryList from "./CountryList";
import CountryInfo from "./CountryInfo";

const LIST_COUNTRIES = gql`
  {
    continents {
      name
      countries {
        name
        capital
        currencies
        currency
        native
        languages {
          name
        }
        subdivisions {
          name
        }
      }
    }
  }
`;

function CountrySearch() {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCountries, setFilteredCountries] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [countriesInPage, setCountriesInPage] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  const [continentSelected, setContinentSelected] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  const [showContinent, setShowContinent] = useState(false); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  const countriesPerPage = 8;

  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  useEffect(() => {
    if (data) {
      setContinents(data.continents);
      var countriesList = [];
      data.continents.forEach((continent) => {
        continent.countries.forEach(async (country) => {
          const ImageURL = await fetchCountryImage(country.name);
          const countryWithFlag = {
            ...country,
            continent: continent.name,
            image: ImageURL,
          };
          countriesList.push(countryWithFlag);
        });
      });
      setCountries(countriesList);
    }
    console.log(countries);
  }, [data]);

  useEffect(() => {
    try {
      setFilteredCountries(
        countries.filter(
          (country) =>
            country.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            country.continent === continentSelected
        )
      );
    } catch (error) {
      console.log(error);
    }
    setCurrentPage(1);
  }, [countries, searchTerm, continentSelected]);

  useEffect(() => {
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    setCountriesInPage(
      filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    );
  }, [filteredCountries, currentPage]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  async function fetchCountryImage(countryName) {
    const apiKey = "41356005-0776f7130e49698041c7af2f1"; // Reemplaza con tu propia API Key de Pixabay
    const searchTermCity = encodeURIComponent(`${countryName} city`);
    const searchTermCountry = encodeURIComponent(countryName);

    const urlCity = `https://pixabay.com/api/?key=${apiKey}&q=${searchTermCity}&image_type=photo`;
    const urlCountry = `https://pixabay.com/api/?key=${apiKey}&q=${searchTermCountry}&image_type=photo`;

    try {
      const responseCity = await fetch(urlCity);
      const dataCity = await responseCity.json();

      if (dataCity.hits.length > 0) {
        return dataCity.hits[0].webformatURL; // Devuelve la URL de la primera imagen encontrada con el término city
      } else {
        // Intenta una segunda búsqueda con el término country
        const responseCountry = await fetch(urlCountry);
        const dataCountry = await responseCountry.json();

        if (dataCountry.hits.length > 0) {
          return dataCountry.hits[0].webformatURL; // Devuelve la URL de la primera imagen encontrada con el término country
        } else {
          // Si no se encuentra ninguna imagen en ambas búsquedas, devuelve la URL predeterminada
          return "https://content.r9cdn.net/rimg/dimg/6f/d5/a11de2dc-city-43889-162df482d9d.jpg?width=1366&height=768&xhint=1422&yhint=2033&crop=true";
        }
      }
    } catch (error) {
      console.error("Error fetching country image:", error);
      // Manejo de errores devolviendo la URL predeterminada en caso de error
      return "https://content.r9cdn.net/rimg/dimg/6f/d5/a11de2dc-city-43889-162df482d9d.jpg?width=1366&height=768&xhint=1422&yhint=2033&crop=true";
    }
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="container">
        <div className="title-container">
          <h1>
            Paises <br /> de este Mundo{" "}
          </h1>
        </div>
        <div className="searchContainer">
          <div className="searchWrapper">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => setShowContinent(true)}
              className="searchInput"
            />
            <FiSearch className="searchIcon" />
          </div>

          {showContinent && (
            <div className="continents" onClick={() => setShowContinent(false)}>
              <div
                className="continent"
                onClick={() => setContinentSelected("North America")}
              >
                <Image
                  src="/norteamerica.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"
                />
              </div>
              <div
                className="continent"
                onClick={() => setContinentSelected("South America")}
              >
                <Image
                  src="/suramerica.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"
                />
              </div>
              <div
                className="continent"
                onClick={() => setContinentSelected("Oceania")}
              >
                <Image
                  src="/oceania.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"
                />
              </div>
              <div
                className="continent"
                onClick={() => setContinentSelected("Europe")}
              >
                <Image
                  src="/europa.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"

                />
              </div>
              <div
                className="continent"
                onClick={() => setContinentSelected("Africa")}
              >
                <Image
                  src="/africa.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"
                />
              </div>
              <div
                className="continent"
                onClick={() => setContinentSelected("Asia")}
              >
                <Image
                  src="/asia.png"
                  height="300"
                  width="350"
                  alt=""
                  className="continent-img"
                />
              </div>
            </div>
          )}

          {
            /* si filteredcOUNTRIES EXISTE ENTONCES MOSTRAR LOS BOTONES*/
            filteredCountries.length > 0 && (
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>{currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage * countriesPerPage >= filteredCountries.length
                  }
                >
                  Next
                </button>
              </div>
            )
          }

          <CountryList countriesInPage={countriesInPage} />
        </div>
      </div>
    </>
  );
}

export default CountrySearch;
