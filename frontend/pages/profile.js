import PropTypes from 'prop-types';
import { ViewProfile } from '../components/ViewProfile';
import { AuthGateway } from '../components/AuthGateway';

const Profile = ({ query }) => (
    <AuthGateway>
        <ViewProfile username={query.username} />
    </AuthGateway>
);

Profile.propTypes = {
    query: PropTypes.object
};

export default Profile;
