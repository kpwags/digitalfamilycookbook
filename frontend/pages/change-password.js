import { useContext } from 'react';
import { ChangePasswordForm } from '../components/ChangePasswordForm/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { AppContext } from '../components/AppContext/AppContext';
import { AccountPage } from '../components/AccountPage/AccountPage';
import { AccountSidebar } from '../components/AccountSidebar/AccountSidebar';

const ChangePassword = () => {
    const { loggedInUser } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/change-password" permissionNeeded="USER">
                <AccountPage>
                    <div style={{ gridColumnStart: 3, gridColumnEnd: 3 }}>
                        <AccountSidebar activePage="CHANGEPASSWORD" />
                    </div>
                    <div style={{ gridColumnStart: 4, gridColumnEnd: 4 }}>
                        <ChangePasswordForm user={loggedInUser} />
                    </div>
                </AccountPage>
            </AuthGateway>
        </>
    );
};

export default ChangePassword;
