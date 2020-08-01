/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Logout } from '../Logout/Logout';
import { AppContext } from '../AppContext/AppContext';
import { useClickOutside } from '../../lib/CustomHooks/useClickOutside';

const UserMenu = styled.ul`
    float: right;
    margin: 0 15px 0 0;
    list-style-type: none;
    line-height: 70px;
    height: 70px;
    display: block;
    position: relative;

    li {
        margin-right: 15px;
        color: hsl(0, 0%, 100%);
        display: block;
        font-size: 1.1rem;
        float: left;
        position: relative;

        :first-child {
            margin-right: 0;
        }

        a {
            display: block;
            color: hsl(0, 0%, 100%);
            float: none;
            border: none;
            padding: 0 10px;

            :hover {
                text-decoration: none;
                background-image: none;
                color: ${(props) => props.theme.paleGreen};

                i.arrow {
                    border-color: ${(props) => props.theme.paleGreen};
                }
            }

            i.arrow {
                border-color: hsl(0, 0%, 100%);
            }
        }

        img {
            width: 40px;
            height: 40px;
            vertical-align: middle;
            border-radius: 50%;
            margin-right: 16px;
            line-height: 70px;
        }

        ul.child-list {
            display: none;
            background: hsl(240, 20%, 98%);
            position: absolute;
            z-index: 12;
            top: 60px;
            right: 15px;
            padding: 0;
            width: 200px;
            box-shadow: ${(props) => props.theme.bs};
            height: auto;

            li {
                display: block;
                float: none;
                margin: 10px 0;
                padding: 0;
                line-height: 1;

                a {
                    display: block;
                    color: ${(props) => props.theme.green};
                    float: none;
                    border: none;
                    padding: 10px;
                    :hover {
                        background: ${(props) => props.theme.green};
                        color: hsl(0, 0%, 100%);
                    }
                }
            }
        }
    }

    @media all and (max-width: 800px) {
        float: none;
        display: none;
    }
`;

const UserHeaderMenu = () => {
    const { loggedInUser, userMenuVisible, toggleUserMenu } = useContext(AppContext);

    const userNav = useRef(null);
    useClickOutside(userNav, userMenuVisible, toggleUserMenu);

    return (
        <UserMenu className="user">
            {loggedInUser && (
                <>
                    <li>
                        <Link href="/create-recipe">
                            <a>Add Recipe</a>
                        </Link>
                    </li>
                    <li ref={userNav}>
                        <a
                            role="button"
                            tabIndex="0"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleUserMenu();
                            }}
                            onKeyDown={(e) => {
                                e.preventDefault();
                                if (e.keyCode === 13 || e.keyCode === 32) {
                                    toggleUserMenu();
                                }
                            }}
                        >
                            <img src={loggedInUser.image} alt={loggedInUser.name} />
                            {`${loggedInUser.name} `} <i className="arrow down" />
                        </a>
                        <ul className="child-list" style={userMenuVisible ? { display: 'block' } : { display: 'none' }}>
                            <li>
                                <Link href="/edit-profile">
                                    <a
                                        onClick={() => {
                                            toggleUserMenu();
                                        }}
                                    >
                                        Account
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href={`/profile?username=${loggedInUser.username}`}>
                                    <a
                                        onClick={() => {
                                            toggleUserMenu();
                                        }}
                                    >
                                        View Profile
                                    </a>
                                </Link>
                            </li>

                            {loggedInUser.permissions.includes('ADMIN') && (
                                <li>
                                    <Link href="/admin">
                                        <a
                                            onClick={() => {
                                                toggleUserMenu();
                                            }}
                                        >
                                            Administration
                                        </a>
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
        </UserMenu>
    );
};

export { UserHeaderMenu };
