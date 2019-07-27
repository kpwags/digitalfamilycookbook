import React, { Component } from 'react';
import { UserGrid } from '../../components/admin/user/UserGrid';
import { AuthGateway } from '../../components/AuthGateway';

class AdminUsers extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/users" permissionNeeded="ADMIN">
                    <h1>Manage Family Members</h1>
                    <UserGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminUsers;
