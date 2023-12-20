import Image from "next/image";

const CountryInfo = ({ country }) => {
  return (
    <div style={styles.container} id="info">
      <div className="header" style={styles.header}>
        <div >
          <h2 style={styles.heading}>{country.name}</h2>
          <Image
            src={country.image}
            alt={country.name}
            width={300}
            height={200}
            style={styles.image}
          />
        </div>

        <div style={styles.title}>
          <p style={styles.text}>
            {" "}
            <b>Capital: </b>
            {country.capital}
          </p>
          <p style={styles.text}>
            {" "}
            <b> Idiomas:</b>{" "}
            {country.languages.map((language) => language.name).join(", ")}
          </p>
          <p style={styles.text}>
            <b>Monedas:</b>{" "}
            {country.currencies.length > 0
              ? country.currencies.join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="content" style={styles.content}>
        {" "}
        <div>
          <p style={styles.text}>
            {country.subdivisions && (
              <div>
                <b>Region: </b> <br />
                {country.subdivisions
                  .map((subdivision) => subdivision.name)
                  .join(", ")}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "7rem",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    width: "90%",
    maxWidth: "700px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },

  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: "3rem 2rem 0",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
  },
  image: {
    borderRadius: "8px",
    margin: "10px 0",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    margin: "8px 0",
    maxWidth: "30rem",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "2rem 20px 0 0",
    marginLeft: "2rem",
    width: "100%",
  },

  header: {
    display: "flex",
    flexWrap: "wrap",
  },

};

export default CountryInfo;
