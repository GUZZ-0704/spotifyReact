import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlay, FaUpload } from 'react-icons/fa';

const SongCard = ({ song, isAdmin}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudioPlayer = () => {
        setIsPlaying(!isPlaying);
    };

    const deleteSong = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this song?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/songs/${id}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Card
            className="song-card mb-4"
            style={{ width: '14rem', position: 'relative' }}
        >
            <Card.Body
                className="text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}
            >
                <Card.Title className="mb-2">{song.title}</Card.Title>

                <FaPlay
                    onClick={toggleAudioPlayer}
                    style={{ cursor: 'pointer', fontSize: '1.5em', color: '#007bff' }}
                />

                {isPlaying && (
                    <audio controls autoPlay style={{ width: '100%', marginTop: '10px' }}>
                        <source src={`http://localhost:3000/uploads/song/${song.id}.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}

                {isAdmin && (
                    <div className="d-flex flex-column align-items-center mt-3">
                        <Link
                            className="btn btn-primary btn-sm mb-2"
                            to={`/admin/songs/${song.id}`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaEdit /> Edit
                        </Link>
                        <Link
                            className="btn btn-secondary btn-sm mb-2"
                            to={`/admin/songs/${song.id}/add-audio`}
                            style={{ width: '80%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaUpload /> Upload Audio
                        </Link>
                        <Button
                            variant="danger"
                            className="btn-sm"
                            style={{ width: '80%' }}
                            onClick={(e) => { e.stopPropagation(); deleteSong(song.id); }}
                        >
                            <FaTrash /> Delete
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

SongCard.propTypes = {
    song: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default SongCard;
