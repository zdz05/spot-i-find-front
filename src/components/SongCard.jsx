import "../css/SongCard.css";
import { useSongContext } from "../contexts/SongContext";

function SongCard({ song }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useSongContext();
  const favorite = isFavorite(song.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(song.id);
    else addToFavorites(song);
  }

  function formatNumber(num) {
    if (num == null) return "—";
    return num.toLocaleString();
  }

  return (
    <div className="song-card">
      <div className="song-header">
        <span className="song-position">#{song.position}</span>
        <span className="song-change">{song.positionChange}</span>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
      </div>
      <div className="song-info">
        <h3>{song.artistAndTitle}</h3>
        <p className="song-peak">
          Peak: {song.peakPosition} {song.peakCount || ""}
        </p>
        <p>Days on chart: {song.days}</p>
        <p>Daily streams: {formatNumber(song.streams)}</p>
        <p className="song-total">Total: {formatNumber(song.totalStreams)}</p>
      </div>
    </div>
  );
}

export default SongCard;
