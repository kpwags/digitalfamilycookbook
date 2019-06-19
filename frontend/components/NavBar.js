import Link from 'next/link';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { ALL_CATEGORIES_QUERY } from '../queries/Category';
import { ALL_MEATS_QUERY } from '../queries/Meats';

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
                border-left: 1px solid #ffffff;
            }
        }
        a {
            display: block;
            float: left;
            color: #ffffff;
            font-weight: bold;
            padding: 0 10px;
            border-right: 1px solid #ffffff;
            :hover {
                background-image: -ms-linear-gradient(bottom, #43ab5e 0%, #00802b 100%);
                background-image: -moz-linear-gradient(bottom, #43ab5e 0%, #00802b 100%);
                background-image: -o-linear-gradient(bottom, #43ab5e 0%, #00802b 100%);
                background-image: -webkit-gradient(
                    linear,
                    left bottom,
                    left top,
                    color-stop(0, #43ab5e),
                    color-stop(100, #00802b)
                );
                background-image: -webkit-linear-gradient(bottom, #43ab5e 0%, #00802b 100%);
                background-image: linear-gradient(to top, #43ab5e 0%, #00802b 100%);
            }
        }

        ul.child-list {
            display: none;
            background: #00802b;
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
                        background: #43ab5e;
                    }
                }
                em {
                    float: none;
                    border: none;
                    color: #ffffff;
                    padding: 0 10px;
                    font-size: -2;
                }
            }
        }

        :hover ul.child-list {
            display: block;
        }
    }
`;

const NavBar = () => (
    <StyledNavBar>
        <li>
            <Link href="/">
                <a>Recipes</a>
            </Link>
        </li>
        <li>
            <Link href="/">
                <a>
                    Categories <i className="fa fa-caret-down" />
                </a>
            </Link>
            <Query query={ALL_CATEGORIES_QUERY}>
                {({ data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                        <ul className="child-list">
                            {data.categories.length > 0 ? (
                                data.categories.map(category => (
                                    <li key={category.id}>
                                        <Link href="/">
                                            <a>{category.name}</a>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <em>No Categories Defined</em>
                                </li>
                            )}
                        </ul>
                    );
                }}
            </Query>
        </li>
        <li>
            <Link href="/">
                <a>
                    Meats <i className="fa fa-caret-down" />
                </a>
            </Link>
            <Query query={ALL_MEATS_QUERY}>
                {({ data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                        <ul className="child-list">
                            {data.meats.length > 0 ? (
                                data.meats.map(meat => (
                                    <li key={meat.id}>
                                        <Link href="/">
                                            <a>{meat.name}</a>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <em>No Meats Defined</em>
                                </li>
                            )}
                        </ul>
                    );
                }}
            </Query>
        </li>
    </StyledNavBar>
);

export default NavBar;
