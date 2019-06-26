import PropTypes from 'prop-types';
import { Profile } from '../components/Profile';

const EditProfile = ({ query }) => (
    <>
        <Profile id={query.id} />
    </>
);

EditProfile.propTypes = {
    query: PropTypes.object
};

export default EditProfile;
