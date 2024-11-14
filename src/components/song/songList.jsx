import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import SongCard from './songCard';

const SongList = ({ songList, isAdmin, refreshSongList }) => {
  return (
    <Container>
      <Row className="mt-4">
        {songList.map((song) => (
          <Col key={song.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <SongCard
              song={song}
              isAdmin={isAdmin}
              refreshSongList={refreshSongList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

SongList.propTypes = {
  songList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  refreshSongList: PropTypes.func.isRequired,
};

export default SongList;
