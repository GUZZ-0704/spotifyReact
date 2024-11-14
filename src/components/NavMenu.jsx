import { Navbar, Nav, Container } from 'react-bootstrap'; // Importa Navbar correctamente
import { FaHome, FaSpotify } from 'react-icons/fa';
import './NavMenu.css';

function NavMenu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Container fluid>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <FaSpotify size={28} className="me-2" color="#1DB954" />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Spotify</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="d-flex align-items-center">
                            <FaHome className="me-2" />
                            Home
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
