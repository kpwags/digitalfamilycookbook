import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AddMeat } from '../../components/AddMeat/AddMeat';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { AppContext } from '../../components/AppContext/AppContext';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AddButton } from '../../components/AddButton/AddButton';
import { HeaderForm } from '../../components/HeaderForm/HeaderForm';
import { Utilities } from '../../lib/Utilities';
import { DeleteMeat } from '../../components/DeleteMeat/DeleteMeat';
import { EditMeat } from '../../components/EditMeat/EditMeat';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';

const AdminMeats = () => {
    const [selected, setSelected] = useState({ id: '', name: '' });
    const [error, setError] = useState(null);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);

    const { data, error: queryError, loading } = useQuery(ALL_MEATS_QUERY);

    const { toggleOverlay } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/admin/meats" permissionNeeded="ADMIN">
                <AdminLayout activePage="meats">
                    <AdminHeader title="Meats">
                        <AddButton>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddFormOpen(true);
                                }}
                                type="button"
                            >
                                + Add
                            </button>
                        </AddButton>
                    </AdminHeader>
                    <HeaderForm id="create-meat-header-form" width="500" style={addFormOpen ? { display: 'block' } : { display: 'none' }}>
                        <AddMeat
                            onComplete={() => {
                                setAddFormOpen(false);
                            }}
                            onCancel={() => {
                                setAddFormOpen(false);
                            }}
                        />
                    </HeaderForm>
                    <HeaderForm id="edit-meat-header-form" width="500" style={editFormOpen ? { display: 'block' } : { display: 'none' }}>
                        <EditMeat
                            id={selected.id}
                            name={selected.name}
                            onComplete={() => {
                                setEditFormOpen(false);
                            }}
                            onCancel={() => {
                                setEditFormOpen(false);
                            }}
                        />
                    </HeaderForm>
                    {loading && (
                        <div>
                            <LoadingBox />
                        </div>
                    )}
                    {(error || queryError) && (
                        <PageError
                            error={{
                                Title: 'Error Loading Meats',
                                Message: error || queryError,
                            }}
                        />
                    )}
                    {!loading && (
                        <>
                            <ErrorMessage message={error} />
                            <Grid>
                                <table cellPadding="0" cellSpacing="0" id="meats_admin_grid">
                                    <thead>
                                        <tr>
                                            <th width="50%" className="no-border">
                                                Name
                                            </th>
                                            <th width="20%" className="no-border">
                                                Created
                                            </th>
                                            <th width="15%" className="no-border">
                                                &nbsp;
                                            </th>
                                            <th width="15%">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.meats.length > 0 ? (
                                            data.meats.map((meat) => (
                                                <tr key={meat.id} id={`row_${meat.id}`}>
                                                    <td>{meat.name}</td>
                                                    <td>{Utilities.formatDate(meat.createdAt)}</td>
                                                    <td align="center">
                                                        <button
                                                            type="button"
                                                            data-id={meat.id}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelected(meat);
                                                                setEditFormOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td align="center">
                                                        <DeleteMeat
                                                            id={meat.id}
                                                            name={meat.name}
                                                            onComplete={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onCancel={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onError={(err) => {
                                                                setError(err);
                                                            }}
                                                        >
                                                            Delete
                                                        </DeleteMeat>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="no-rows">
                                                    No Meats Defined
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

export default AdminMeats;
