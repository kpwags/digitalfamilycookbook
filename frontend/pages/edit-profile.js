import { EditProfileForm } from '../components/EditProfileForm/EditProfileForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const EditProfile = () => (
    <AuthGateway redirectUrl="/edit-profile" permissionNeeded="USER">
        <EditProfileForm />
    </AuthGateway>
);

export default EditProfile;
