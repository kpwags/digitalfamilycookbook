import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { siteTitle } from '../../config';
import { UserHeaderMenu } from '../UserHeaderMenu/UserHeaderMenu';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import { AppContext } from '../AppContext/AppContext';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch';

const StyledHeader = styled.header`
    margin: 0px;
    padding: 0px;
    height: 70px;
    line-height: 70px;
    background: ${(props) => props.theme.green};

    ul {
        float: left;
        list-style-type: none;
        line-height: 70px;
        height: 70px;
        display: block;
        margin: 0;

        &.user {
            float: right;
        }

        li {
            display: block;
            font-size: 1.1rem;
            float: left;
            position: relative;

            a {
                display: block;
                float: left;
                color: hsl(0, 0%, 100%);
                font-weight: normal;
                padding: 0 20px;

                :hover {
                    text-decoration: none;
                    color: ${(props) => props.theme.paleGreen};
                }
            }
        }

        li.search {
            display: none;
        }

        @media all and (max-width: 1300px) {
            li.search {
                display: block;
            }

            li {
                a {
                    padding: 0 10px;
                }
            }
        }

        @media all and (max-width: 800px) {
            float: none;
            display: none;
        }
    }

    @media print {
        display: none;
    }

    @media all and (max-width: 800px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
    }
`;

const Logo = styled.h1`
    font-size: 1.4rem;
    margin: 0 48px 0 15px;
    padding: 0;
    line-height: 70px;
    float: left;
    font-weight: normal;

    a {
        color: hsl(0, 0%, 100%);

        :hover {
            text-decoration: none;
            color: ${(props) => props.theme.paleGreen};
        }
    }

    @media all and (max-width: 1400px) {
        margin-right: 20px;
    }

    @media all and (max-width: 800px) {
        float: none;
        line-height: 50px;
        margin-left: 56px;
    }
`;

const Header = () => {
    const { loggedInUser, toggleSearchBar } = useContext(AppContext);

    return (
        <StyledHeader>
            <HamburgerMenu />
            <Logo>
                <Link href="/">
                    <a>{siteTitle}</a>
                </Link>
            </Logo>

            <ul>
                <li>
                    <Link href="/recipes">
                        <a>Recipes</a>
                    </Link>
                </li>

                <li>
                    <Link href="/category">
                        <a>Categories</a>
                    </Link>
                </li>

                <li>
                    <Link href="/meat">
                        <a>Meats</a>
                    </Link>
                </li>

                <li className="search">
                    <a
                        role="button"
                        title="Search"
                        tabIndex="0"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSearchBar();
                        }}
                        onKeyDown={(e) => {
                            e.preventDefault();
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                toggleSearchBar();
                            }
                        }}
                    >
                        Search
                    </a>
                </li>
            </ul>

            <HeaderSearch />

            {loggedInUser && <UserHeaderMenu />}

            {!loggedInUser && (
                <ul className="user">
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
                </ul>
            )}
        </StyledHeader>
    );
};

export { Header };
