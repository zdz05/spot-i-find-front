import "../css/Favorites.css";
import { useSongContext } from "../contexts/SongContext";
import SongCard from "../components/SongCard";

function Favorites() {
  const { favorites } = useSongContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="songs-grid">
          {favorites.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Songs Yet</h2>
      <p>Start adding songs to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
