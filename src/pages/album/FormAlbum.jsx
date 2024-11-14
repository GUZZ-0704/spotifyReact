import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [artistId, setArtistId] = useState('');
    const [artistsList, setArtistsList] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getAlbumById();
        }
        getArtistsList();
    }, [id]);

    const getAlbumById = () => {
        axios.get(`http://localhost:3000/albums/${id}`)
            .then(res => {
                const album = res.data;
                setTitle(album.title);
                setArtistId(album.artist?.id || album.artistId || '');
            })
            .catch(error => console.error(error));
    };

    const getArtistsList = () => {
        axios.get('http://localhost:3000/artists')
            .then(res => setArtistsList(res.data))
            .catch(error => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (e.currentTarget.checkValidity() === false) {
            return;
        }

        const album = {
            title,
            artistId
        };

        if (id) {
            editAlbum(album);
        } else {
            insertAlbum(album);
        }
    };

    const editAlbum = (album) => {
        axios.put(`http://localhost:3000/albums/${id}`, album)
            .then(() => navigate('/admin/albums'))
            .catch(error => console.error(error));
    };

    const insertAlbum = (album) => {
        axios.post('http://localhost:3000/albums', album)
            .then(() => navigate('/admin/albums'))
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>{id ? 'Editar Álbum' : 'Crear Álbum'}</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Título:</Form.Label>
                                    <Form.Control
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese el título del álbum.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Artista:</Form.Label>
                                    <Form.Select
                                        required
                                        value={artistId}
                                        onChange={(e) => setArtistId(e.target.value)}
                                    >
                                        <option value="">Seleccione un artista...</option>
                                        {artistsList.map(artist => (
                                            <option key={artist.id} value={artist.id}>
                                                {artist.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un artista.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" className="mt-3">Guardar Álbum</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormAlbum;
