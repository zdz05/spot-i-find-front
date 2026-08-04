import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import CountryChart from "./pages/CountryChart";
import { Routes, Route } from "react-router-dom";
import { SongProvider } from "./contexts/SongContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <SongProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:slug" element={<CountryChart />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </SongProvider>
  );
}

export default App;
