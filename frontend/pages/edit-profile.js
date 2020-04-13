import { AccountPage } from '../components/AccountPage/AccountPage';
import { AccountSidebar } from '../components/AccountSidebar/AccountSidebar';
import { EditProfileForm } from '../components/EditProfileForm/EditProfileForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const EditProfile = () => (
    <AuthGateway redirectUrl="/edit-profile" permissionNeeded="USER">
        <AccountPage>
            <div style={{ gridColumnStart: 3, gridColumnEnd: 3 }}>
                <AccountSidebar activePage="EDITPROFILE" />
            </div>
            <div style={{ gridColumnStart: 4, gridColumnEnd: 4 }}>
                <EditProfileForm />
            </div>
        </AccountPage>
    </AuthGateway>
);

export default EditProfile;
