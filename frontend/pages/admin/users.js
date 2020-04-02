import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_USERS_QUERY } from '../../queries/User';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { Grid } from '../../components/Grid/Grid';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { UserToggleAdmin } from '../../components/UserToggleAdmin/UserToggleAdmin';
import { UserDelete } from '../../components/UserDelete/UserDelete';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage/SuccessMessage';
import { AppContext } from '../../components/AppContext/AppContext';

const AdminUsers = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const { data, error: queryError, loading } = useQuery(ALL_USERS_QUERY);

    const { loggedInUser, toggleOverlay } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/admin/users" permissionNeeded="ADMIN">
                <AdminLayout activePage="familymembers">
                    <AdminHeader title="Family Members" />

                    {loading && (
                        <div>
                            <LoadingBox />
                        </div>
                    )}

                    {(error || queryError) && (
                        <PageError
                            error={{
                                Title: 'Error Loading Categories',
                                Message: error || queryError,
                            }}
                        />
                    )}

                    {!loading && (
                        <>
                            <SuccessMessage message={successMessage} />
                            <ErrorMessage message={error} />
                            <Grid>
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
                                                    <td>{user.permissions.includes('ADMIN') ? 'Adminstrator' : 'Member'}</td>
                                                    {user.id === loggedInUser.id ? (
                                                        <>
                                                            <td align="center">&nbsp;</td>
                                                            <td align="center">&nbsp;</td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td align="center">
                                                                <UserToggleAdmin userId={user.id}>
                                                                    {user.permissions.includes('ADMIN') ? 'Remove Admin' : 'Make Admin'}
                                                                </UserToggleAdmin>
                                                            </td>
                                                            <td align="center">
                                                                <UserDelete
                                                                    id={user.id}
                                                                    name={user.name}
                                                                    continue={async err => {
                                                                        toggleOverlay();
                                                                        if (err !== null) {
                                                                            setError(err);
                                                                        } else {
                                                                            setSuccessMessage('Category successfully deleted');
                                                                        }
                                                                    }}
                                                                    cancel={() => {
                                                                        toggleOverlay();
                                                                    }}
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
                            </Grid>
                        </>
                    )}
                </AdminLayout>
            </AuthGateway>
        </>
    );
};

export default AdminUsers;
