import { Link } from "react-router-dom";
import "../css/CountryCard.css";

const CARD_COLORS = ["sand", "sage", "clay", "mist", "wheat", "rose"];

function CountryCard({ country, index }) {
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <Link to={`/country/${country.slug}`} className={`country-card ${colorClass}`}>
      <h3>{country.name}</h3>
      <p>{country.songCount} songs</p>
      <span className="country-link">View chart →</span>
    </Link>
  );
}

export default CountryCard;
