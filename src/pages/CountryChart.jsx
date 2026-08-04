import SongCard from "../components/SongCard";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  countryNameFromUrl,
  countryUrlFromSlug,
  getSongsByCountry,
} from "../services/api";
import "../css/CountryChart.css";

function CountryChart() {
  const { slug } = useParams();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountrySongs = async () => {
      setLoading(true);
      setError(null);

      try {
        const countryUrl = countryUrlFromSlug(slug);
        const countrySongs = await getSongsByCountry(countryUrl);
        const chartSongs = countrySongs.sort((a, b) => a.position - b.position);

        setCountryName(countryNameFromUrl(countryUrl));
        setSongs(chartSongs);
        setFilteredSongs(chartSongs);
      } catch (err) {
        console.log(err);
        setError("Failed to load chart for this country...");
      } finally {
        setLoading(false);
      }
    };

    loadCountrySongs();
  }, [slug]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSongs(songs);
      return;
    }

    const query = searchQuery.toLowerCase();
    setFilteredSongs(
      songs.filter((song) =>
        song.artistAndTitle.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, songs]);

  return (
    <div className="country-chart">
      <Link to="/" className="back-link">
        ← All countries
      </Link>

      <h1 className="page-title">{countryName} Top 200</h1>
      <p className="page-subtitle">{songs.length} songs in daily chart</p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="search-form"
      >
        <input
          type="text"
          placeholder="Search within this chart..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="songs-grid">
          {filteredSongs.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      )}

      {!loading && filteredSongs.length === 0 && (
        <div className="empty-chart">No songs found for this country.</div>
      )}
    </div>
  );
}

export default CountryChart;
