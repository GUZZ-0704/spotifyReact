import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormArtist = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [genreId, setGenreId] = useState('');
    const [genresList, setGenresList] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getArtistById();
        }
        getGenresList();
    }, [id]);

    const getArtistById = () => {
        axios.get(`http://localhost:3000/artists/${id}`)
            .then(res => {
                const artist = res.data;
                setName(artist.name);
                setGenreId(artist.genre?.id || ''); // Asegúrate de obtener `id` de `genre` si está presente
            })
            .catch(error => console.error(error));
    };

    const getGenresList = () => {
        axios.get('http://localhost:3000/genres')
            .then(res => setGenresList(res.data))
            .catch(error => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (e.currentTarget.checkValidity() === false) {
            return;
        }

        const artist = {
            name,
            genreId
        };

        if (id) {
            editArtist(artist);
        } else {
            insertArtist(artist);
        }
    };

    const editArtist = (artist) => {
        axios.put(`http://localhost:3000/artists/${id}`, artist)
            .then(() => navigate('/admin/artists'))
            .catch(error => console.error(error));
    };

    const insertArtist = (artist) => {
        axios.post('http://localhost:3000/artists', artist)
            .then(() => navigate('/admin/artists'))
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>{id ? 'Editar Artista' : 'Crear Artista'}</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese el nombre del artista.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Género:</Form.Label>
                                    <Form.Select
                                        required
                                        value={genreId}
                                        onChange={(e) => setGenreId(e.target.value)}
                                    >
                                        <option value="">Seleccione un género...</option>
                                        {genresList.map(genre => (
                                            <option key={genre.id} value={genre.id}>
                                                {genre.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un género.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" className="mt-3">Guardar Artista</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormArtist;
