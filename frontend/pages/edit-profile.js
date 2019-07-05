import { EditProfileForm } from '../components/forms/user/EditProfileForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <AuthGateway redirectUrl="/edit-profile">
        <EditProfileForm />
    </AuthGateway>
);

export default EditProfile;
