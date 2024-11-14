import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Image, Form } from 'react-bootstrap';
import NavMenu from './../../components/NavMenu';
import NavMenuAdmin from './../../components/NavMenuAdmin';
import { useParams } from 'react-router-dom';
import SongList from './../../components/song/songList';
import AlbumCard from './../../components/album/albumCard';
import ArtistCard from './../../components/artist/artistCard';
import SongCard from './../../components/song/songCard';
import GenreCard from './../../components/genre/genreCard';

const ArtistPage = ({ isAdmin }) => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (search.trim() === '') {
            fetchArtistDetails();
            fetchArtistAlbums();
        } else {
            fetchSearchResults();
        }
    }, [artistId, search]);

    useEffect(() => {
        if (albums.length > 0 && window.location.hash) {
            const elementId = window.location.hash.replace("#", "");
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [albums]);

    const fetchArtistDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/artists/${artistId}`);
            setArtist(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles del artista:', error);
        }
    };

    const fetchArtistAlbums = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/artists/${artistId}/albums`);
            setAlbums(response.data);
            setSearchResults(null);
        } catch (error) {
            console.error('Error al obtener los álbumes del artista:', error);
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
                {artist && (
                    <>
                        <Row className="mb-4">
                            <Col md={4}>
                                <Image src={`http://localhost:3000/uploads/artist/${artist.id}.jpg`} rounded fluid />
                            </Col>
                            <Col md={8}>
                                <h2>{artist.name}</h2>
                                <p><strong>Género:</strong> {artist.genre.name}</p>
                            </Col>
                        </Row>

                        <Form className="mb-4">
                            <Row>
                                <Col xs={12} md={6} className="mx-auto">
                                    <Form.Group controlId="searchInput">
                                        <Form.Label>Buscar</Form.Label>
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
                                            <ArtistCard artist={artist} isAdmin={false} />
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
                            <>
                                <h3>Álbumes</h3>
                                {albums.map((album) => (
                                    <Card 
                                    id={`album-${album.id}`}
                                    key={album.id} className="mb-3">
                                        <Card.Header>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={`http://localhost:3000/uploads/album/${album.id}.jpg`} rounded fluid />
                                                </Col>
                                                <Col md={10}>
                                                    <h5>{album.title}</h5>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <SongList
                                            songList={album.songs || []}
                                            isAdmin={isAdmin}
                                            refreshSongList={fetchArtistAlbums}
                                        />
                                    </Card>
                                ))}
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

ArtistPage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default ArtistPage;
