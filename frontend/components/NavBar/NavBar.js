import Link from 'next/link';
import styled from 'styled-components';
import { CategoriesNav } from '../CategoriesNav/CategoriesNav';
import { MeatsNav } from '../MeatsNav/MeatsNav';
import { SearchIcon } from '../SearchIcon/SearchIcon';
import { Utilities } from '../../lib/Utilities';

const StyledNavBar = styled.ul`
    float: left;
    margin: 0 0 15px;
    list-style-type: none;
    line-height: 50px;
    height: 50px;
    display: block;
    li {
        display: block;
        font-size: 20px;
        float: left;
        position: relative;
        :first-child {
            a {
                border-left: 1px solid hsl(0, 0%, 100%);
            }
        }
        a {
            display: block;
            float: left;
            color: hsl(0, 0%, 100%);
            font-weight: bold;
            padding: 0 10px;
            border-right: 1px solid hsl(0, 0%, 100%);
            :hover {
                background-image: -ms-linear-gradient(
                    bottom,
                    ${props => props.theme.lightGreen} 0%,
                    ${props => props.theme.green} 100%
                );
                background-image: -moz-linear-gradient(
                    bottom,
                    ${props => props.theme.lightGreen} 0%,
                    ${props => props.theme.green} 100%
                );
                background-image: -o-linear-gradient(
                    bottom,
                    ${props => props.theme.lightGreen} 0%,
                    ${props => props.theme.green} 100%
                );
                background-image: -webkit-gradient(
                    linear,
                    left bottom,
                    left top,
                    color-stop(0, ${props => props.theme.lightGreen}),
                    color-stop(100, ${props => props.theme.green})
                );
                background-image: -webkit-linear-gradient(
                    bottom,
                    ${props => props.theme.lightGreen} 0%,
                    ${props => props.theme.green} 100%
                );
                background-image: linear-gradient(
                    to top,
                    ${props => props.theme.lightGreen} 0%,
                    ${props => props.theme.green} 100%
                );
                text-decoration: none;
            }
        }

        ul.child-list {
            display: none;
            background: ${props => props.theme.green};
            background-image: none;
            position: absolute;
            z-index: 2;
            top: 100%;
            left: 0;
            padding: 0;
            width: 250px;

            li {
                display: block;
                float: none;
                a {
                    float: none;
                    border: none;
                    padding: 0 10px;
                    :hover {
                        background-image: none;
                        background: ${props => props.theme.lightGreen};
                    }
                }
                em {
                    float: none;
                    border: none;
                    color: hsl(0, 0%, 100%);
                    padding: 0 10px;
                    font-size: -2;
                }
            }
        }

        :hover ul.child-list {
            display: block;
        }
    }

    li.search-button {
        svg {
            vertical-align: middle;
            cursor: pointer;
            fill: hsl(0, 0%, 100%);
        }
    }

    @media all and (max-width: 800px) {
        float: none;
        display: none;
    }
`;

const NavBar = () => (
    <StyledNavBar>
        <li>
            <Link href="/recipes">
                <a>Recipes</a>
            </Link>
        </li>

        <CategoriesNav />
        <MeatsNav />
        <li className="search-button">
            <a
                role="button"
                title="Search"
                tabIndex="0"
                onClick={e => {
                    e.preventDefault();
                    Utilities.toggleSearchBar();
                }}
                onKeyDown={e => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        Utilities.toggleSearchBar();
                    }
                }}
            >
                <SearchIcon width="30" height="30" />
            </a>
        </li>
    </StyledNavBar>
);

export { NavBar };
