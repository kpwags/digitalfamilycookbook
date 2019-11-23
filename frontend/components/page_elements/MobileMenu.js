import styled from 'styled-components';
import Link from 'next/link';
import { MeatsMobileNav } from './MeatsMobileNav';
import { CategoriesMobileNav } from './CategoriesMobileNav';
import { User } from '../User';
import { Logout } from '../Logout';

const Menu = styled.div`
    width: 250px;
    background-color: #313131;
    padding: 0 15px;
    position: fixed;
    left: -250px;
    top: 50px;
    height: 100%;
    transition: left 0.5s;

    ul {
        margin: 0;
        padding: 0;
        overflow-y: scroll;

        li {
            font-size: 1.15rem;
            list-style-type: none;
            margin: 10px 0 0 25px;
        }

        li.title {
            font-size: 1.4rem;
            margin: 15px 0px;
            color: #fff;
        }

        li.bordered {
            border-top: 1px solid #fff;
            padding-top: 15px;
        }

        a {
            color: #fff;
        }

        i {
            border: solid #fff;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            margin: 0 10px 5px 8px;
        }

        .left {
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
        }

        .down {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
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
                            {!loading && (
                                <>
                                    <li className="title">{me.name}</li>
                                    <li>
                                        <Logout />
                                    </li>
                                </>
                            )}

                            {!me && (
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
                        </>
                    )}
                </User>
                <li className="title bordered">
                    <Link href="/recipes">
                        <a>Recipes</a>
                    </Link>
                </li>
                <CategoriesMobileNav />
                <MeatsMobileNav />
            </ul>
        </Menu>
    );
};

export { MobileMenu };
