import { useContext } from 'react';
import { ChangePasswordForm } from '../components/ChangePasswordForm/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { AppContext } from '../components/AppContext/AppContext';

const ChangePassword = () => {
    const { loggedInUser } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/change-password" permissionNeeded="USER">
                <ChangePasswordForm user={loggedInUser} />
            </AuthGateway>
        </>
    );
};

export default ChangePassword;
