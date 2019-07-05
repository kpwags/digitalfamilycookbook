import React, { Component } from 'react';
import { AuthGateway } from '../../components/AuthGateway';
import { Home } from '../../components/admin/Home';

class AdminMeats extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/meats" permissionNeeded="ADMIN">
                    <Home />
                </AuthGateway>
            </>
        );
    }
}

export default AdminMeats;
