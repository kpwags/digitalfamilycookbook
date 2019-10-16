import { ChangePasswordForm } from '../components/forms/user/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/change-password" permissionNeeded="USER">
            <ChangePasswordForm />
        </AuthGateway>
    </>
);

export default EditProfile;
