import React from 'react';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';

const AdminIndex = () => {
    return (
        <>
            <AuthGateway redirectUrl="/admin" permissionNeeded="ADMIN">
                <AdminLayout />
            </AuthGateway>
        </>
    );
};

export default AdminIndex;
