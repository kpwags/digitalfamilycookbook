import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';

const AdminHome = styled.div`
    text-align: center;

    div.admin-links {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        margin: 25px 0;

        a {
            display: block;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            padding: 15px 25px;
        }

        a.gray {
            border-color: rgb(51, 51, 51);
            background: rgba(204, 204, 204);
            color: rgb(51, 51, 51);
        }

        a.orange {
            border-color: rgb(204, 122, 0);
            background: rgba(255, 194, 102, 0.3);
            color: rgb(204, 122, 0);
        }

        a.green {
            border-color: rgb(0, 77, 0);
            background: rgba(0, 180, 0, 0.3);
            color: rgb(0, 77, 0);
        }

        a.blue {
            border-color: rgb(0, 64, 128);
            background: rgba(77, 166, 255, 0.3);
            color: rgb(0, 64, 128);
        }

        a.purple {
            border-color: rgb(115, 0, 230);
            background: rgba(204, 153, 255, 0.3);
            color: rgb(115, 0, 230);
        }

        a.mint {
            border-color: rgb(0, 102, 73);
            color: rgb(0, 102, 73);
            background: rgb(179, 255, 234);
        }
    }
`;

class AdminMeats extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/meats" permissionNeeded="ADMIN">
                    <AdminHome>
                        <h1>Administration</h1>
                        <div className="admin-links">
                            <Link href="/admin/invitation-codes">
                                <a className="gray">Manage Invitation Codes</a>
                            </Link>
                            <Link href="/admin/users">
                                <a className="orange">Manage Family Members</a>
                            </Link>
                            <Link href="/admin/categories">
                                <a className="green">Manage Categories</a>
                            </Link>
                            <Link href="/admin/meats">
                                <a className="blue">Manage Meats</a>
                            </Link>
                            <Link href="/admin/recipes">
                                <a className="purple">Manage Recipes</a>
                            </Link>
                        </div>
                    </AdminHome>
                </AuthGateway>
            </>
        );
    }
}

export default AdminMeats;
