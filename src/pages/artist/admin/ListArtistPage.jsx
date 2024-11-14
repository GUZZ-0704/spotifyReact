import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenuAdmin from "../../../components/NavMenuAdmin";
import { Link } from "react-router-dom";

const ListArtistPage = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        getArtists();
        document.title = "Listado de Artistas";
    }, []);

    const getArtists = () => {
        axios.get('http://localhost:3000/artists')
            .then(res => {
                setArtists(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este artista?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/artists/${id}`)
            .then(res => {
                console.log(res.data);
                getArtists();
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenuAdmin />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Artistas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Género</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {artists.map(artist =>
                                            <tr key={artist.id}>
                                                <td>
                                                    <img className="list-image" src={`http://localhost:3000/uploads/artist/${artist.id}.jpg`} alt="Imagen del artista" width="100" />
                                                </td>
                                                <td>{artist.id}</td>
                                                <td>{artist.name}</td>
                                                <td>{artist.genre.name}</td>
                                                <td>
                                                    <Link className="btn btn-secondary" to={`/admin/artists/${artist.id}/photo`}>Cargar Foto</Link>{' '}
                                                    <Link className="btn btn-primary" to={`/admin/artists/${artist.id}`}>Editar</Link>{' '}
                                                    <Button variant="danger" onClick={() => eliminar(artist.id)}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListArtistPage;
