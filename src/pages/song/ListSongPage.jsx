import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenuAdmin from "./../../components/NavMenuAdmin";	
import { Link } from "react-router-dom";

const ListSongPage = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        getSongs();
        document.title = "Listado de Canciones";
    }, []);

    const getSongs = () => {
        axios.get('http://localhost:3000/songs')
            .then(res => {
                setSongs(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta canción?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/songs/${id}`)
            .then(res => {
                console.log(res.data);
                getSongs();
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
                                    <h2>Lista de Canciones</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Título</th>
                                            <th>Álbum</th>
                                            <th>Artista</th>
                                            <th>Género</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {songs.map(song =>
                                            <tr key={song.id}>
                                                <td>{song.id}</td>
                                                <td>{song.title}</td>
                                                <td>{song.album.title}</td>
                                                <td>{song.artist.name}</td>
                                                <td>{song.genre.name}</td>
                                                <td>
                                                    <Link className="btn btn-secondary" to={`/admin/songs/${song.id}/file`}>Editar</Link>{' '}
                                                    <Link className="btn btn-primary" to={`/admin/songs/${song.id}`}>Editar</Link>{' '}
                                                    <Button variant="danger" onClick={() => eliminar(song.id)}>Eliminar</Button>
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

export default ListSongPage;
