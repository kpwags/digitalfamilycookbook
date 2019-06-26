import Link from 'next/link';
import { AuthGateway } from '../components/AuthGateway';

const Account = () => (
    <>
        <AuthGateway redirectUrl="/edit-profile">
            <h1>Account Settings</h1>
            <p>
                <Link href="/change-password">
                    <a>Change Password</a>
                </Link>
            </p>
        </AuthGateway>
    </>
);

export default Account;
