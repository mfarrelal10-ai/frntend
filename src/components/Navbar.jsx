import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/kategori">Data Kategori</NavLink>
                        <NavLink className="nav-link" to="/kategori/tambah">Tambah Kategori</NavLink>
                        <NavLink className="nav-link" to="/movies">Data Movies</NavLink>
                        <NavLink className="nav-link" to="/movies/tambah">Tambah Movies</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;