import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import AlbumCard from './albumCard';

const AlbumList = ({ albumList, isAdmin, refreshAlbumList }) => {
  return (
    <Container>
      <Row className="mt-4">
        {albumList.map((album) => (
          <Col key={album.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <AlbumCard
              album={album}
              isAdmin={isAdmin}
              refreshAlbumList={refreshAlbumList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

AlbumList.propTypes = {
  albumList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  refreshAlbumList: PropTypes.func.isRequired,
};

export default AlbumList;
