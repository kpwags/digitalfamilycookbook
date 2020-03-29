import { useContext } from 'react'
import Link from 'next/link';
import styled from 'styled-components';
import { Logout } from '../Logout/Logout';
import { AppContext } from '../AppContext/AppContext';

const UserMenu = styled.ul`
    float: right;
    margin: 0;
    list-style-type: none;
    line-height: 50px;
    height: 50px;
    display: block;
    li {
        margin-right: 15px;
        color: hsl(0, 0%, 100%);
        display: block;
        font-size: 20px;
        float: left;
        position: relative;

        a {
            display: block;
            color: hsl(0, 0%, 100%);
            float: none;
            border: none;
            padding: 0 10px;
            :hover {
                background-image: none;
                background: ${props => props.theme.lightGreen};
            }
        }

        img {
            width: 40px;
            height: 40px;
            vertical-align: middle;
            border-radius: 50%;
            margin-right: 8px;
            line-height: 50px;
        }

        ul.child-list {
            display: none;
            background: ${props => props.theme.green};
            background-image: none;
            position: absolute;
            z-index: 2;
            top: 100%;
            right: -15px;
            padding: 0;
            width: 200px;

            li {
                display: block;
                float: none;
                margin: 0;
                a {
                    display: block;
                    color: hsl(0, 0%, 100%);
                    float: none;
                    border: none;
                    padding: 0 10px;
                    :hover {
                        background-image: none;
                        background: ${props => props.theme.lightGreen};
                    }
                }
            }
        }

        :hover ul.child-list {
            display: block;
        }
    }

    @media all and (max-width: 800px) {
        float: none;
        display: none;
    }
`;

const UserHeaderMenu = () => {
    const { loggedInUser } = useContext(AppContext);

    return (
        <UserMenu>
            {loggedInUser && (
                <>
                    <li>
                        <img src={loggedInUser.image} alt={loggedInUser.name} /> {`${loggedInUser.name} `}
                        <i className="arrow down" />
                        <ul className="child-list">
                            <li>
                                <Link href="/create-recipe">
                                    <a>Add New Recipe</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/edit-profile">
                                    <a>Profile</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account">
                                    <a>Settings</a>
                                </Link>
                            </li>

                            {loggedInUser.permissions.includes('ADMIN') && (
                                <li>
                                    <Link href="/admin">
                                        <a>Administration</a>
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Logout />
                            </li>
                        </ul>
                    </li>
                </>
            )}

            {!loggedInUser && (
                <>
                    <li>
                        <Link href="/signup">
                            <a>Sign Up</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>Sign In</a>
                        </Link>
                    </li>
                </>
            )}
        </UserMenu>
    );
};

export { UserHeaderMenu };
