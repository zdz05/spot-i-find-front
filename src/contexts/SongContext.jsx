import { createContext, useState, useContext, useEffect } from "react";

const SongContext = createContext();

export const useSongContext = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (song) => {
    setFavorites((prev) => [...prev, song]);
  };

  const removeFromFavorites = (songId) => {
    setFavorites((prev) => prev.filter((song) => song.id !== songId));
  };

  const isFavorite = (songId) => {
    return favorites.some((song) => song.id === songId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
