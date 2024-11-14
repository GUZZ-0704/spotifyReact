import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import ArtistCard from './artistCard'; // Adjust the path as necessary

const ArtistList = ({ artistList, isAdmin, refreshArtistList }) => {
  return (
    <Container>
      <Row className="mt-4">
        {artistList.map((artist) => (
          <Col key={artist.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ArtistCard
              artist={artist}
              isAdmin={isAdmin}
              refreshArtistList={refreshArtistList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

ArtistList.propTypes = {
  artistList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  refreshArtistList: PropTypes.func.isRequired,
};

export default ArtistList;
