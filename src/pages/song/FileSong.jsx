import axios from "axios";
import { useState } from "react";
import NavMenu from "./../../components/NavMenuAdmin";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FileSong = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [validated, setValidated] = useState(false);

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post(`http://localhost:3000/songs/${id}/file`, formData)
            .then((res) => {
                console.log(res.data);
                navigate(`/admin/songs`);
                window.location.reload();
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Subir Archivo de la Canción</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione un archivo MP3:</Form.Label>
                                        <Form.Control required type="file" accept=".mp3" onChange={onChangeFile} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo MP3.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Archivo</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FileSong;
