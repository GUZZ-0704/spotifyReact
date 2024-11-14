import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEdit, FaTrash, FaCamera } from 'react-icons/fa';

const AlbumCard = ({ album, isAdmin }) => {
    const navigate = useNavigate();

    const goToDetail = () => {
        if (isAdmin) {
            navigate(`/admin/albums/${album.id}`);
        } else if (album.artist && album.artist.id) {
            navigate(`/artists/${album.artist.id}#album-${album.id}`);
        } else {
            console.error("Artist data is missing for album redirection.");
        }
    };

    const deleteAlbum = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this album?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/albums/${id}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Card
            id={`album-${album.id}`}
            className="album-card mb-4"
            style={{ width: '14rem', cursor: 'pointer', position: 'relative' }}
            onClick={goToDetail}
        >
            <Card.Img
                variant="top"
                src={`http://localhost:3000/uploads/album/${album.id}.jpg`}
                alt={album.title}
                style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <Card.Body
                className="text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0 0 10px 10px' }}
            >
                <Card.Title className="mb-0">{album.title}</Card.Title>

                {isAdmin && (
                    <div className="d-flex flex-column align-items-center mt-2">
                        <Link
                            className="btn btn-primary btn-sm mb-2"
                            to={`/admin/albums/${album.id}`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaEdit /> Edit
                        </Link>
                        <Link
                            className="btn btn-secondary btn-sm mb-2"
                            to={`/admin/albums/${album.id}/add-photo`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaCamera /> Add Photo
                        </Link>
                        <Button
                            variant="danger"
                            className="btn-sm"
                            style={{ width: '80%' }}
                            onClick={(e) => { e.stopPropagation(); deleteAlbum(album.id); }}
                        >
                            <FaTrash /> Delete
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

AlbumCard.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default AlbumCard;
