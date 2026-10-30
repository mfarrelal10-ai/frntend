import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/MoviesServices";
import Loading from "../components/Loading";

function EditMovies(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title : '',
        year : ''
    })
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        try{
            const response = await getMovieById(id);
            console.log(response.data);
            setForm({
                title: response.data.title,
                year: response.data.year
            });
        }catch(error) {
            console.log(error);
            alert('Data tidak ditemukan');
            navigate('/movies');
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
            const payload = {
                id: Number(id),
                title: form.title,
                year: form.year ? Number(form.year) : null
            };
            console.log('Data yang dikirim : ', payload);
            await updateMovie(id, payload);
            alert('Data berhasil diupdate.');
            navigate('/movies');
        }catch(error){
            console.log(error);
            alert('Gagal mengupdate Data');
        }
    };
    if (loading){
        return <Loading/>;
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h3 className="fw-bold mb-4">
                                    Edit Movies
                                </h3>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Title
                                        </label>
                                        <input
                                        onChange={handleChange}
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        className="form-control"
                                        placeholder="Masukkan Movies" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Tahun
                                        </label>
                                        <input
                                        type="number"
                                        onChange={handleChange}
                                        name="year"
                                        value={form.year}
                                        className="form-control"
                                        placeholder="Tuliskan Tahun" required>
                                        </input>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary">
                                            <i className="bi bi-save me-2"></i>
                                            Update
                                        </button>
                                        <button type="button"
                                            onClick={()=>navigate('/movies')}
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
export default EditMovies;