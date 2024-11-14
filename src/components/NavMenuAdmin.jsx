import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavMenu.css';

const NavMenuAdmin = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar bg="dark" expand="lg" expanded={expanded} className="navbar-custom">
            <Container>
                <Navbar.Brand href="/admin/dashboard" className="text-light fw-bold">
                    🎶 Spotify Admin Dashboard
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Songs" id="songs-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/songs">Lista de canciones</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/songs/create">Crear cancion</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Artists" id="artists-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/artists">Lista de artistas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/artists/create">Crear artista</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Genres" id="genres-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/genres">Lista de generos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/genres/create">Crear genero</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Albums" id="albums-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/albums">Lista de album</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/albums/create">Crear Album</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenuAdmin;
