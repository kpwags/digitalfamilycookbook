import { ChangePasswordForm } from '../components/ChangePasswordForm/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { LoggedInUser } from '../components/LoggedInUser/LoggedInUser';

const ChangePassword = () => (
    <>
        <AuthGateway redirectUrl="/change-password" permissionNeeded="USER">
            <LoggedInUser>
                {({ data: { me } }) => {
                    return <ChangePasswordForm user={me} />;
                }}
            </LoggedInUser>
        </AuthGateway>
    </>
);

export default ChangePassword;
