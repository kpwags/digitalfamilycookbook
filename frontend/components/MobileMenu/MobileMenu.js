import { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MeatsMobileNav } from '../MeatsMobileNav/MeatsMobileNav';
import { CategoriesMobileNav } from '../CategoriesMobileNav/CategoriesMobileNav';
import { AppContext } from '../AppContext/AppContext';
import { Logout } from '../Logout/Logout';
import { Utilities } from '../../lib/Utilities';

const Menu = styled.div`
    width: 250px;
    background-color: hsl(0, 0%, 19.2%);
    padding: 0 15px;
    position: fixed;
    left: -250px;
    top: 50px;
    height: 100%;
    z-index: 5;
    transition: left 0.5s;
    overflow-y: scroll;

    ul {
        margin: 0;
        padding: 0;

        li {
            font-size: 1.15rem;
            list-style-type: none;
            margin: 10px 0 0 15px;

            ul {
                display: none;
                margin: 0;
                padding: 0;

                li {
                    margin: 8px 0 8px 10px;
                }
            }
        }

        li.title {
            font-size: 1.4rem;
            margin: 15px 0px 0px;
            color: hsl(0, 0%, 100%);
        }

        li.bordered {
            border-top: 1px solid hsl(0, 0%, 100%);
            padding-top: 15px;
        }

        a {
            color: hsl(0, 0%, 100%);
        }
    }
`;

const MobileMenu = () => {
    const { loggedInUser } = useContext(AppContext);

    return (
        <Menu id="mobilemenu">
            <ul>
                <>
                    {loggedInUser && (
                        <>
                            <li className="title">{loggedInUser.name}</li>
                            <li>
                                <Logout />
                            </li>
                        </>
                    )}

                    {!loggedInUser && (
                        <>
                            <li className="title">
                                <Link href="/signup">
                                    <a
                                        role="button"
                                        tabIndex="0"
                                        onClick={() => {
                                            Utilities.toggleMobileMenu();
                                        }}
                                        onKeyDown={e => {
                                            if (
                                                e.keyCode === 13 ||
                                                e.keyCode === 32
                                            ) {
                                                Utilities.toggleMobileMenu();
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </a>
                                </Link>
                            </li>
                            <li className="title bordered">
                                <Link href="/login">
                                    <a
                                        role="button"
                                        tabIndex="0"
                                        onClick={() => {
                                            Utilities.toggleMobileMenu();
                                        }}
                                        onKeyDown={e => {
                                            if (
                                                e.keyCode === 13 ||
                                                e.keyCode === 32
                                            ) {
                                                Utilities.toggleMobileMenu();
                                            }
                                        }}
                                    >
                                        Sign In
                                    </a>
                                </Link>
                            </li>
                        </>
                    )}
                </>
                <li className="title bordered">
                    <Link href="/recipes">
                        <a
                            role="button"
                            tabIndex="0"
                            onClick={() => {
                                Utilities.toggleMobileMenu();
                            }}
                            onKeyDown={e => {
                                if (e.keyCode === 13 || e.keyCode === 32) {
                                    Utilities.toggleMobileMenu();
                                }
                            }}
                        >
                            Recipes
                        </a>
                    </Link>
                </li>
                <CategoriesMobileNav />
                <MeatsMobileNav />
            </ul>
        </Menu>
    );
};

export { MobileMenu };
