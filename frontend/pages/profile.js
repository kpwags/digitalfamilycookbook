import PropTypes from 'prop-types';
import { Profile } from '../components/Profile';

const EditProfile = ({ query }) => (
    <>
        <Profile username={query.username} />
    </>
);

EditProfile.propTypes = {
    query: PropTypes.object
};

export default EditProfile;
