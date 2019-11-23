import Link from 'next/link';
import styled from 'styled-components';
import { User } from '../User';
import { Logout } from '../Logout';
import { DownArrow } from '../svg/DownArrow';

const UserMenu = styled.ul`
    float: right;
    margin: 0;
    list-style-type: none;
    line-height: 50px;
    height: 50px;
    display: block;
    li {
        margin-right: 15px;
        color: #ffffff;
        display: block;
        font-size: 20px;
        float: left;
        position: relative;

        a {
            display: block;
            color: #ffffff;
            float: none;
            border: none;
            padding: 0 10px;
            :hover {
                background-image: none;
                background: #43ab5e;
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
            background: #00802b;
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
                    color: #ffffff;
                    float: none;
                    border: none;
                    padding: 0 10px;
                    :hover {
                        background-image: none;
                        background: #43ab5e;
                    }
                }
            }
        }

        :hover ul.child-list {
            display: block;
        }
    }

    @media all and (max-width: 768px) {
        float: none;
        display: none;
    }
`;

const UserHeaderMenu = () => (
    <User>
        {({ data: { me }, loading }) => (
            <>
                {!loading && (
                    <UserMenu>
                        {me && (
                            <>
                                <li>
                                    <img src={me.image} alt={me.name} />{' '}
                                    {`${me.name} `}
                                    <DownArrow
                                        width={15}
                                        height={15}
                                        fill="#fff"
                                        viewbox="0 0 129 129"
                                    />
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

                                        {me.permissions.includes('ADMIN') && (
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
                    </UserMenu>
                )}
            </>
        )}
    </User>
);

export default UserHeaderMenu;
