import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 1. Pastikan nama import sudah benar sesuai KategoriServices.js
import { getCategoriesById, updateCategories } from "../services/KategoriServices";
import Loading from "../components/Loading";

function EditKategori(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [loading, setLoading] = useState(true);

    // 2. Tambahkan 'id' di dalam dependency array [] agar loadData jalan sesuai ID
    useEffect(() => {
        loadData();
    }, [id]) 

    const loadData = async () =>{
        try {
            // 3. PERBAIKAN: Panggil getCategoriesById (pakai 's'), bukan getCategoryById
            const response = await getCategoriesById(id);
            console.log(response.data);
            setForm({
                name: response.data.name,
                description : response.data.description
            });
        }catch (error) {
            console.log(error);
            alert('Data tidak ditemukan');
            navigate('/kategori');
        }finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        try{
            console.log('Data yang dikirim : ', form);
            // 4. PERBAIKAN: Panggil updateCategories (pakai 's'), bukan updateCategory
            await updateCategories(id, form); 
            alert('Data berhasil diupdate.');
            navigate('/kategori');
        }catch(error){
            console.log(error);
            alert('Gagal mengupdate Data');
        }
    };

    // 5. PERBAIKAN: Tambahkan 'return' sebelum <Loading />
    if (loading) {
        return <Loading />; 
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h3 className="fw-bold mb-4">
                                    Edit Kategori
                                </h3>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Nama Kategori
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            className="form-control"
                                            placeholder="Masukkan nama" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            onChange={handleChange}
                                            name="description"
                                            value={form.description}
                                            className="form-control"
                                            rows="5"
                                            placeholder="Tuliskan Deskripsi" required>
                                        </textarea>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary">
                                            <i className="bi bi-save me-2"></i>
                                            Update
                                        </button>
                                        <button type="button"
                                            onClick={()=>navigate('/kategori')}
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
export default EditKategori;