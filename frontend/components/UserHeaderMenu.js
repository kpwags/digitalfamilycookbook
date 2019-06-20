import Link from 'next/link';
import styled from 'styled-components';
import { User } from './User';
import { Logout } from './Logout';

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
`;

const UserHeaderMenu = () => (
    <User>
        {({ data: { me } }) => (
            <UserMenu>
                {me && (
                    <>
                        <li>
                            <img src="/static/images/profile-picture.jpg" alt="user" /> {`${me.name} `}
                            <i className="fa fa-caret-down" />
                            <ul className="child-list">
                                <li>
                                    <Link href="/">
                                        <a>Profile</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <a>Settings</a>
                                    </Link>
                                </li>
                                <li>
                                    <Logout />
                                </li>
                            </ul>
                        </li>
                    </>
                )}

                {!me && (
                    <li>
                        <Link href="/login">
                            <a>Sign In</a>
                        </Link>
                    </li>
                )}
            </UserMenu>
        )}
    </User>
);

export default UserHeaderMenu;
