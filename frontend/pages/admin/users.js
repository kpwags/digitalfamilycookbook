import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_USERS_QUERY } from '../../queries/User';
import { AdminLayout } from '../../components/admin/AdminLayout/AdminLayout';
import { PageHeader } from '../../components/admin/elements/PageHeader';
import { AddButton } from '../../components/styles/AddButton';
import { AuthGateway } from '../../components/AuthGateway';
import { AdminGrid } from '../../components/styles/AdminGrid';
import { LoadingBox } from '../../components/elements/LoadingBox';
import { PageError } from '../../components/elements/PageError';
import { UserToggleAdmin } from '../../components/admin/UserToggleAdmin/UserToggleAdmin';
import { UserDelete } from '../../components/admin/UserDelete/UserDelete';
import { User } from '../../components/User';

class AdminUsers extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/users" permissionNeeded="ADMIN">
                    <AdminLayout activePage="familymembers">
                        <PageHeader title="Family Members" />
                        <Query query={ALL_USERS_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <div>
                                            <LoadingBox />
                                        </div>
                                    );
                                if (error)
                                    return (
                                        <PageError
                                            error={{
                                                Title: 'Error Loading Users',
                                                Message: error
                                            }}
                                        />
                                    );

                                return (
                                    <User>
                                        {({ data: { me } }) => (
                                            <>
                                                <AdminGrid>
                                                    <table cellPadding="0" cellSpacing="0" id="users_admin_grid">
                                                        <thead>
                                                            <tr>
                                                                <th width="45%" className="no-border">
                                                                    Name
                                                                </th>
                                                                <th width="20%" className="no-border">
                                                                    Role
                                                                </th>
                                                                <th width="20%">&nbsp;</th>
                                                                <th width="15%">&nbsp;</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.users.length > 0 ? (
                                                                data.users.map(user => (
                                                                    <tr key={user.id} id={`row_${user.id}`}>
                                                                        <td>{user.name}</td>
                                                                        <td>
                                                                            {user.permissions.includes('ADMIN')
                                                                                ? 'Adminstrator'
                                                                                : 'Member'}
                                                                        </td>
                                                                        {user.id === me.id ? (
                                                                            <>
                                                                                <td align="center">&nbsp;</td>
                                                                                <td align="center">&nbsp;</td>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <td align="center">
                                                                                    <UserToggleAdmin userId={user.id}>
                                                                                        {user.permissions.includes(
                                                                                            'ADMIN'
                                                                                        )
                                                                                            ? 'Remove Admin'
                                                                                            : 'Make Admin'}
                                                                                    </UserToggleAdmin>
                                                                                </td>
                                                                                <td align="center">
                                                                                    <UserDelete
                                                                                        id={user.id}
                                                                                        name={user.name}
                                                                                    >
                                                                                        Delete
                                                                                    </UserDelete>
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="4" className="no-rows">
                                                                        No Users? Huh?
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </AdminGrid>
                                            </>
                                        )}
                                    </User>
                                );
                            }}
                        </Query>
                    </AdminLayout>
                </AuthGateway>
            </>
        );
    }
}

export default AdminUsers;
