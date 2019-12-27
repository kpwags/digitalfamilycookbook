import { ChangePasswordForm } from '../components/ChangePasswordForm/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/change-password" permissionNeeded="USER">
            <ChangePasswordForm />
        </AuthGateway>
    </>
);

export default EditProfile;
