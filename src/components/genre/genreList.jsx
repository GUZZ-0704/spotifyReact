import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import GenreCard from './genreCard';

const GenreList = ({ genreList, isAdmin, refreshGenreList }) => {
  return (
    <Container>
      <Row className="mt-4">
        {genreList.map((genre) => (
          <Col key={genre.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <GenreCard
              genre={genre}
              isAdmin={isAdmin}
              refreshGenreList={refreshGenreList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

GenreList.propTypes = {
  genreList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  refreshGenreList: PropTypes.func.isRequired,
};

export default GenreList;
