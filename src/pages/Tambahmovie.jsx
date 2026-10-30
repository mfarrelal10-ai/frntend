import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { createMovie } from '../services/MoviesServices';
// 1. Sesuaikan nama import dengan yang ada di KategoriServices.js
import { getAllCategories } from '../services/KategoriServices'; 

function TambahMovie(){
    const navigate = useNavigate();
    
    const [ form, setForm ] = useState({
        title : '',
        year : '',
        categoryId: '' 
    })

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // 2. Panggil fungsi yang benar
                const response = await getAllCategories();
                console.log("Data Kategori dari API:", response.data);
                
                // 3. Sesuaikan penyimpanan data. 
                // Jika backend mengembalikan { data: [...] } gunakan response.data.data
                // Jika backend langsung mengembalikan [...] gunakan response.data
                // (Coba console.log dulu untuk memastikan)
                setCategories(response.data.data || response.data); 
            } catch (error) {
                console.error("Gagal mengambil data kategori:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            console.log('Data yang dikirim : ', form);
            
            // Ubah year dan categoryId menjadi Integer (angka) sebelum dikirim
            const payload = {
                title: form.title,
                year: parseInt(form.year),
                categoryId: parseInt(form.categoryId)
            };
            
            await createMovie(payload);
            alert('Data berhasil ditambahkan');
            navigate('/movies');
        }catch(error){
            console.log(error);
            alert('Gagal menambahkan data');
        }
    }

    return(
        <section className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm tambah-kategori-card">
                            <div className="card-body p-4">
                                <h3 className="fw-bold mb4 tambah-kategori">
                                    Tambah Movies
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Nama Movies</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            className="form-control"
                                            placeholder="Masukkan nama" required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Year</label>
                                        <input
                                            onChange={handleChange}
                                            type="number"
                                            name="year"
                                            value={form.year}
                                            className="form-control"
                                            placeholder="Masukkan Tahun" required 
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Pilih Kategori</label>
                                        <select
                                            onChange={handleChange}
                                            name="categoryId"
                                            value={form.categoryId}
                                            className="form-select" 
                                            required
                                        >
                                            <option value="" disabled>-- Pilih Kategori --</option>
                                            {categories.map((kategori) => (
                                                // PERHATIKAN BARIS INI:
                                                // Pastikan properti id dan nama sesuai dengan JSON dari backend
                                                // Contoh: jika backend pakai { id: 1, name: "Action" }, maka gunakan kategori.id dan kategori.name
                                                <option key={kategori.id} value={kategori.id}>
                                                    {kategori.name || kategori.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary">
                                            <i className="bi bi-save me-2"></i>
                                            Simpan
                                        </button>
                                        <button
                                            type="button" 
                                            onClick={() => navigate('/movies')}
                                            className="btn btn-secondary">
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>       
    )
}
export default TambahMovie;