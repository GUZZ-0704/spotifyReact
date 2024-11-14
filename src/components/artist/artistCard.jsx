import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEdit, FaTrash, FaCamera } from 'react-icons/fa';

const ArtistCard = ({ artist, isAdmin}) => {
    const navigate = useNavigate();

    const goToDetail = () => {
        if (isAdmin) {
            navigate(`/admin/artists/${artist.id}`);
        } else {
            navigate(`/artists/${artist.id}`);
        }
    };

    const deleteArtist = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this artist?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/artists/${id}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Card
            className="artist-card mb-4"
            style={{ width: '14rem', cursor: 'pointer', position: 'relative' }}
            onClick={goToDetail}
        >
            <Card.Img 
                variant="top" 
                src={`http://localhost:3000/uploads/artist/${artist.id}.jpg`}
                alt={artist.name} 
                style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <Card.Body
                className="text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0 0 10px 10px' }}
            >
                <Card.Title className="mb-0">{artist.name}</Card.Title>

                {isAdmin && (
                    <div className="d-flex flex-column align-items-center mt-2">
                        <Link
                            className="btn btn-primary btn-sm mb-2"
                            to={`/admin/artists/${artist.id}`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaEdit /> Edit
                        </Link>
                        <Link
                            className="btn btn-secondary btn-sm mb-2"
                            to={`/admin/artists/${artist.id}/add-photo`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaCamera /> Add Photo
                        </Link>
                        <Button
                            variant="danger"
                            className="btn-sm"
                            style={{ width: '80%' }}
                            onClick={(e) => { e.stopPropagation(); deleteArtist(artist.id); }}
                        >
                            <FaTrash /> Delete
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default ArtistCard;
