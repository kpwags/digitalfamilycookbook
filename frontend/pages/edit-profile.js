import { EditProfileForm } from '../components/EditProfileForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/edit-profile">
            <h1>Edit Profile</h1>
            <EditProfileForm />
        </AuthGateway>
    </>
);

export default EditProfile;
