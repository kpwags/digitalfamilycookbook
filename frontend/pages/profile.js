import PropTypes from 'prop-types';
import { ViewProfile } from '../components/ViewProfile';

const Profile = ({ query }) => (
    <>
        <ViewProfile username={query.username} />
    </>
);

Profile.propTypes = {
    query: PropTypes.object
};

export default Profile;
