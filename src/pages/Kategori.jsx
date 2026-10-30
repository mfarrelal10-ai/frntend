import { useEffect, useState } from "react";
import Loading from "../components/Loading";
// 1. Tambahkan deleteCategories dan Link
import { getAllCategories, deleteCategories } from "../services/KategoriServices";
import { Link } from "react-router-dom"; 

function Kategori() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllCategories();
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError("Gagal Mengambil data kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Tambahkan fungsi handleDelete
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah anda yakin ingin menghapus kategori ini?");
    if (!konfirmasi) return;
    
    try {
      await deleteCategories(id);
      alert("Data berhasil dihapus!");
      loadData(); // Muat ulang data agar tabel langsung terupdate
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-4">
      <div className="container-fluid px-4">
        
        {/* Header & Tombol Tambah */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold m-0">Data Kategori</h3>
          <Link to="/kategori/tambah" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Tambah Kategori
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "50px" }}>No</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th className="text-center" style={{ width: "150px" }}>Aksi</th> {/* Tambah kolom aksi */}
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item.id || index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                          {/* 3. TAMBAHKAN TOMBOL EDIT DAN HAPUS DI SINI */}
                          <div className="d-flex gap-1 justify-content-center">
                            <Link
                              to={`/kategori/edit/${item.id}`}
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
                        Belum ada data Kategori.
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

export default Kategori;