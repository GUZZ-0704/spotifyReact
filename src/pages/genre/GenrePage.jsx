import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form } from 'react-bootstrap';
import GenreList from './../../components/genre/GenreList';
import NavMenu from "./../../components/NavMenu";
import NavMenuAdmin from "./../../components/NavMenuAdmin";
import AlbumCard from './../../components/album/albumCard';
import ArtistCard from './../../components/artist/artistCard';
import SongCard from './../../components/song/SongCard';
import GenreCard from './../../components/genre/genreCard';

const GenrePage = ({ isAdmin }) => {
    const [genreList, setGenreList] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (search.trim() === '') {
            fetchGenres();
        } else {
            fetchSearchResults();
        }
    }, [search]);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:3000/genres');
            setGenreList(response.data);
            setSearchResults(null);
        } catch (error) {
            console.error('Error al obtener los géneros:', error);
        }
    };

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get('http://localhost:3000/search', {
                params: { search: search.trim() },
            });
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            {isAdmin ? <NavMenuAdmin /> : <NavMenu />}
            <Container className="mt-4">
                <h1 className="text-center">Buscar</h1>

                <Form className="mb-4">
                    <Row>
                        <Col xs={12} md={6} className="mx-auto">
                            <Form.Group controlId="searchInput">
                                <Form.Label>Buscar por Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar canciones, álbumes, artistas o géneros"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {searchResults ? (
                    <>
                        <h3>Resultados de la búsqueda</h3>

                        <Row>
                            <h4>Géneros</h4>
                            {searchResults.genres?.map((genre) => (
                                <Col key={genre.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <GenreCard genre={genre} isAdmin={false}/>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <h4>Artistas</h4>
                            {searchResults.artists?.map((artist) => (
                                <Col key={artist.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <ArtistCard artist={artist} isAdmin={false}/>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <h4>Álbumes</h4>
                            {searchResults.albums?.map((album) => (
                                <Col key={album.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <AlbumCard album={album} isAdmin={false}/>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <h4>Canciones</h4>
                            {searchResults.songs?.map((song) => (
                                <Col key={song.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <SongCard song={song} isAdmin={false}/>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <GenreList
                        genreList={genreList}
                        isAdmin={isAdmin}
                        refreshGenreList={fetchGenres}
                    />
                )}
            </Container>
        </>
    );
};

GenrePage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default GenrePage;