import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AddCategory } from '../../components/AddCategory/AddCategory';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AddButton } from '../../components/AddButton/AddButton';
import { HeaderForm } from '../../components/HeaderForm/HeaderForm';
import { Utilities } from '../../lib/Utilities';
import { DeleteCategory } from '../../components/DeleteCategory/DeleteCategory';
import { EditCategory } from '../../components/EditCategory/EditCategory';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage/SuccessMessage';
import { AppContext } from '../../components/AppContext/AppContext';

const AdminCategories = () => {
    const [selected, setSelected] = useState({ id: '', name: '' });
    const [error, setError] = useState(null);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { data, error: queryError, loading } = useQuery(ALL_CATEGORIES_QUERY);

    const { toggleOverlay } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/admin/categories" permissionNeeded="ADMIN">
                <AdminLayout activePage="categories">
                    <AdminHeader title="Categories">
                        <AddButton>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    setAddFormOpen(true);
                                }}
                                type="button"
                            >
                                + Add
                            </button>
                        </AddButton>
                    </AdminHeader>
                    <HeaderForm
                        id="create-category-header-form"
                        width="500"
                        style={addFormOpen ? { display: 'block' } : { display: 'none' }}
                    >
                        <AddCategory
                            onDone={() => {
                                setAddFormOpen(false);
                            }}
                        />
                    </HeaderForm>
                    <HeaderForm
                        id="edit-category-header-form"
                        width="500"
                        style={editFormOpen ? { display: 'block' } : { display: 'none' }}
                    >
                        <EditCategory
                            id={selected.id}
                            name={selected.name}
                            onDone={() => {
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
                                Title: 'Error Loading Categories',
                                Message: error || queryError
                            }}
                        />
                    )}
                    {!loading && (
                        <>
                            <SuccessMessage message={successMessage} />
                            <ErrorMessage message={error} />
                            <Grid>
                                <table cellPadding="0" cellSpacing="0" id="categories_admin_grid">
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
                                        {data.categories.length > 0 ? (
                                            data.categories.map(category => (
                                                <tr key={category.id} id={`row_${category.id}`}>
                                                    <td>{category.name}</td>
                                                    <td>{Utilities.formatDate(category.createdAt)}</td>
                                                    <td align="center">
                                                        <button
                                                            type="button"
                                                            data-id={category.id}
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                setSelected(category);
                                                                setEditFormOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td align="center">
                                                        <DeleteCategory
                                                            id={category.id}
                                                            name={category.name}
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
                                                        </DeleteCategory>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="no-rows">
                                                    No Categories Defined
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

export default AdminCategories;
