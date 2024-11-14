import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormGenre = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getGenreById();
        }
    }, [id]);

    const getGenreById = () => {
        axios.get(`http://localhost:3000/genres/${id}`)
            .then(res => {
                const genre = res.data;
                setName(genre.name);
            })
            .catch(error => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (e.currentTarget.checkValidity() === false) {
            return;
        }

        const genre = { name };

        if (id) {
            editGenre(genre);
        } else {
            insertGenre(genre);
        }
    };

    const editGenre = (genre) => {
        axios.put(`http://localhost:3000/genres/${id}`, genre)
            .then(() => navigate('/admin/genres'))
            .catch(error => console.error(error));
    };

    const insertGenre = (genre) => {
        axios.post('http://localhost:3000/genres', genre)
            .then(() => navigate('/admin/genres'))
            .catch(error => console.error(error));
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>{id ? 'Editar Género' : 'Crear Género'}</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre del Género:</Form.Label>
                                    <Form.Control
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese el nombre del género.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" className="mt-3">Guardar Género</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormGenre;
