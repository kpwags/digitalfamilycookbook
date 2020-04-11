import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const SidebarList = styled.ul`
    list-style-type: none;

    li {
        margin: 12px 0;
        font-size: 1.09rem;

        &.active {
            font-weight: bold;
            color: ${(props) => props.theme.darkGreen};
        }

        a {
            color: ${(props) => props.theme.green};
        }
    }
`;

const AccountSidebar = (props) => {
    const { activePage } = props;

    return (
        <>
            <h2>Account</h2>
            <SidebarList>
                <li className={activePage === 'EDITPROFILE' ? 'active' : ''}>
                    {activePage === 'EDITPROFILE' ? (
                        <>Edit Profile</>
                    ) : (
                        <Link href="/edit-profile">
                            <a>Edit Profile</a>
                        </Link>
                    )}
                </li>
                <li className={activePage === 'CHANGEPASSWORD' ? 'active' : ''}>
                    {activePage === 'CHANGEPASSWORD' ? (
                        <>Change Password</>
                    ) : (
                        <Link href="/change-password">
                            <a>Change Password</a>
                        </Link>
                    )}
                </li>
            </SidebarList>
        </>
    );
};

AccountSidebar.propTypes = {
    activePage: PropTypes.string.isRequired,
};

export { AccountSidebar };
