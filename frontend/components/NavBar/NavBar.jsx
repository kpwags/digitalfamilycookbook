import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AppContext } from '../AppContext/AppContext';

const StyledNavBar = styled.ul`
    float: left;
    list-style-type: none;
    line-height: 70px;
    height: 70px;
    display: block;
    margin: 0;

    li {
        display: block;
        font-size: 1.1rem;
        float: left;
        position: relative;

        a {
            display: block;
            float: left;
            color: ${(props) => props.theme.green};
            font-weight: normal;
            padding: 0 20px;

            :hover {
                text-decoration: none;
            }
        }
    }

    @media all and (max-width: 800px) {
        float: none;
        display: none;
    }
`;

const NavBar = () => {
    const { toggleSearchBar } = useContext(AppContext);

    return (
        <StyledNavBar>
            <li>
                <Link href="/recipes">
                    <a>Recipes</a>
                </Link>
            </li>

            <li>
                <Link href="/categories">
                    <a>Categories</a>
                </Link>
            </li>

            <li>
                <Link href="/meats">
                    <a>Meats</a>
                </Link>
            </li>

            <li>
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
        </StyledNavBar>
    );
};

export { NavBar };
