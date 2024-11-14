import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenuAdmin from "./../../components/NavMenuAdmin";	
import { Link } from "react-router-dom";

const ListAlbumPage = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums();
        document.title = "Listado de Álbumes";
    }, []);

    const getAlbums = () => {
        axios.get('http://localhost:3000/albums')
            .then(res => {
                setAlbums(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este álbum?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/albums/${id}`)
            .then(res => {
                console.log(res.data);
                getAlbums();
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
                                    <h2>Lista de Álbumes</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Artista</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {albums.map(album =>
                                            <tr key={album.id}>
                                                <td>
                                                    <img className="list-image" src={`http://localhost:3000/uploads/album/${album.id}.jpg`} alt="Portada del álbum" width="100" />
                                                </td>
                                                <td>{album.id}</td>
                                                <td>{album.title}</td>
                                                <td>{album.artist ? album.artist.name : 'Sin artista'}</td>
                                                <td>
                                                    <Link className="btn btn-secondary" to={`/admin/albums/${album.id}/photo`}>Cargar Foto</Link>{' '}
                                                    <Link className="btn btn-primary" to={`/admin/albums/${album.id}`}>Editar</Link>{' '}
                                                    <Button variant="danger" onClick={() => eliminar(album.id)}>Eliminar</Button>
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

export default ListAlbumPage;
