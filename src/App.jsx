import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import Kategori from "./pages/Kategori";
import TambahKategori from "./pages/TambahKategori";
import EditMovies from "./pages/EditMovies";
import Movies from "./pages/Movies";
import TambahMovie from "./pages/Tambahmovie";
import EditKategori from "./pages/EditKategori";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          
          {/* Rute Kategori */}
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/tambah" element={<TambahKategori />} />
          <Route path="/kategori/edit/:id" element={<EditKategori />} /> {/* TAMBAHAN INI */}
          
          {/* Rute Movies */}
          <Route path="/movies" element={<Movies />} /> {/* Saya hapus garis miring di akhir agar lebih rapi */}
          <Route path="/movies/tambah" element={<TambahMovie />} />
          <Route path="/movies/edit/:id" element={<EditMovies />} /> {/* TAMBAHAN INI */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;