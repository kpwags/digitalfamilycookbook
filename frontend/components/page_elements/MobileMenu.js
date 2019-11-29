import styled from 'styled-components';
import Link from 'next/link';
import { MeatsMobileNav } from './MeatsMobileNav';
import { CategoriesMobileNav } from './CategoriesMobileNav';
import { User } from '../User';
import { Logout } from '../Logout';
import { Utilities } from '../../lib/Utilities';

const Menu = styled.div`
    width: 250px;
    background-color: #313131;
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
            color: #fff;
        }

        li.bordered {
            border-top: 1px solid #fff;
            padding-top: 15px;
        }

        a {
            color: #fff;
        }
    }
`;

const MobileMenu = () => {
    return (
        <Menu id="mobilemenu">
            <ul>
                <User>
                    {({ data: { me }, loading }) => (
                        <>
                            {!loading && me && (
                                <>
                                    <li className="title">{me.name}</li>
                                    <li>
                                        <Logout />
                                    </li>
                                </>
                            )}

                            {!me && (
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
                    )}
                </User>
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
