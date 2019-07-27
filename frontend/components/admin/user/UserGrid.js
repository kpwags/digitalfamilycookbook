import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_USERS_QUERY } from '../../../queries/User';
import { AdminGrid } from '../../styles/AdminGrid';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { User } from '../../User';
import { ToggleAdmin } from './ToggleAdmin';
import { DeleteUser } from './DeleteUser';

class UserGrid extends Component {
    state = {
        error: null
    };

    render() {
        const gridStyle = {
            width: '1000px'
        };
        return (
            <User>
                {({ data: { me } }) => (
                    <>
                        <ErrorMessage error={this.state.error} />

                        <AdminGrid cellPadding="0" cellSpacing="0" id="useradmingrid" style={gridStyle}>
                            <thead>
                                <tr>
                                    <th width="20%" className="no-border">
                                        Name
                                    </th>
                                    <th width="15%" className="no-border">
                                        Username
                                    </th>
                                    <th width="30%" className="no-border">
                                        Email
                                    </th>
                                    <th width="10%" className="no-border">
                                        Role
                                    </th>
                                    <th width="15%" className="no-border">
                                        &nbsp;
                                    </th>
                                    <th width="10%">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Query query={ALL_USERS_QUERY}>
                                    {({ data, error, loading }) => {
                                        if (loading)
                                            return (
                                                <tr>
                                                    <td colSpan="3">Loading...</td>
                                                </tr>
                                            );
                                        if (error)
                                            return (
                                                <tr>
                                                    <td colSpan="3">Error: {error.message}</td>
                                                </tr>
                                            );
                                        return data.users.length > 0 ? (
                                            data.users.map(user => (
                                                <tr key={user.id} id={user.id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.permissions.includes('ADMIN') ? 'Adminstrator' : 'Member'}
                                                    </td>
                                                    {user.id === me.id ? (
                                                        <>
                                                            <td align="center">&nbsp;</td>
                                                            <td align="center">&nbsp;</td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td align="center">
                                                                <ToggleAdmin userId={user.id}>
                                                                    {user.permissions.includes('ADMIN')
                                                                        ? 'Remove Admin'
                                                                        : 'Make Admin'}
                                                                </ToggleAdmin>
                                                            </td>
                                                            <td align="center">
                                                                <DeleteUser id={user.id} name={user.name}>
                                                                    Delete
                                                                </DeleteUser>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    <em>No Users...so who are you?</em>
                                                </td>
                                            </tr>
                                        );
                                    }}
                                </Query>
                            </tbody>
                        </AdminGrid>
                    </>
                )}
            </User>
        );
    }
}

export { UserGrid };
