import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormSong = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [artistId, setArtistId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [albumsList, setAlbumsList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getSongById();
        }
        getAlbumsList();
        getArtistsList();
        getGenresList();
    }, [id]);

    const getSongById = () => {
        axios.get(`http://localhost:3000/songs/${id}`)
            .then(res => {
                const song = res.data;
                setTitle(song.title);
                setAlbumId(song.album?.id || song.albumId || ''); // Asegura obtener el ID correcto
                setArtistId(song.artist?.id || song.artistId || ''); // Asegura obtener el ID correcto
                setGenreId(song.genre?.id || song.genreId || ''); // Asegura obtener el ID correcto
            })
            .catch(error => console.error(error));
    };

    const getAlbumsList = () => {
        axios.get('http://localhost:3000/albums')
            .then(res => setAlbumsList(res.data))
            .catch(error => console.error(error));
    };

    const getArtistsList = () => {
        axios.get('http://localhost:3000/artists')
            .then(res => setArtistsList(res.data))
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

        const song = {
            title,
            albumId,
            artistId,
            genreId
        };

        if (id) {
            editSong(song);
        } else {
            insertSong(song);
        }
    };

    const editSong = (song) => {
        axios.put(`http://localhost:3000/songs/${id}`, song)
            .then(() => navigate('/admin/songs'))
            .catch(error => console.error(error));
    };

    const insertSong = (song) => {
        axios.post('http://localhost:3000/songs', song)
            .then(() => navigate('/admin/songs'))
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>{id ? 'Editar Canción' : 'Crear Canción'}</h2>
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
                                        Por favor ingrese el título de la canción.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Álbum:</Form.Label>
                                    <Form.Select
                                        required
                                        value={albumId}
                                        onChange={(e) => setAlbumId(e.target.value)}
                                    >
                                        <option value="">Seleccione un álbum...</option>
                                        {albumsList.map(album => (
                                            <option key={album.id} value={album.id}>
                                                {album.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un álbum.
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

                                <Button type="submit" className="mt-3">Guardar Canción</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormSong;
