import CountryCard from "../components/CountryCard";
import { useState, useEffect } from "react";
import { getCountries } from "../services/api";
import "../css/Home.css";

function Home() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryList = await getCountries();
        setCountries(countryList);
      } catch (err) {
        console.log(err);
        setError("Failed to load countries...");
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return (
    <div className="home">
      <h1 className="page-title">Spotify Charts by Country</h1>
      <p className="page-subtitle">Select a country to view its top 200 songs</p>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="countries-grid">
          {countries.map((country, index) => (
            <CountryCard country={country} index={index} key={country.slug} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
