import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getAllMovies, deleteMovie } from "../services/MoviesServices";
import { Link } from "react-router-dom";

function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllMovies();
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError("Gagal mengambil data movie");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah anda yakin ingin menghapus movie ini?");
    if (!konfirmasi) return;

    try {
      await deleteMovie(id);
      alert("Data berhasil dihapus!");
      loadData(); // Refresh tabel
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-4 w-100">
      <div className="container-fluid px-4">
        
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <h3 className="fw-bold m-0">Data Movies</h3>
          <Link to="/movies/tambah" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Tambah Movie
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "50px" }}>NO</th>
                    <th>TITLE</th>
                    <th>YEAR</th>
                    <th className="text-center" style={{ width: "150px" }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item.id || index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.year}</td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center">
                            <Link
                              to={`/movies/edit/${item.id}`}
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-sm btn-outline-danger"
                              title="Hapus"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">
                        Belum ada data Movies.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movies;