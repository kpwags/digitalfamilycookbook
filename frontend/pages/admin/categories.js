import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert';
import { EditCategory } from '../../components/EditCategory/EditCategory';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { DELETE_CATEGORY_MUTATION } from '../../mutations/Category';
import { TOGGLE_OVERLAY_MUTATION } from '../../mutations/Local';

const AdminCategories = () => {
    const [selected, setSelected] = useState({ id: '', name: '' });
    const [error, setError] = useState(null);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, error: queryError, loading } = useQuery(ALL_CATEGORIES_QUERY);

    const updateCache = (cache, { data: result }) => {
        const categoryData = cache.readQuery({ query: ALL_CATEGORIES_QUERY });

        categoryData.categories = categoryData.categories.filter(category => category.id !== result.deleteCategory.id);

        cache.writeQuery({ query: ALL_CATEGORIES_QUERY, data: categoryData });
    };

    const [toggleOverlay] = useMutation(TOGGLE_OVERLAY_MUTATION);
    const [deleteCategory, { error: deleteError }] = useMutation(DELETE_CATEGORY_MUTATION, {
        update: updateCache
    });

    const confirmDelete = e => {
        e.preventDefault();

        toggleOverlay();
        setConfirmOpen(!confirmOpen);
    };

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
                            key={selected.id}
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
                                                    <ErrorAlert error={deleteError || error} />
                                                    <ConfirmDialog
                                                        open={confirmOpen}
                                                        message={`Are you sure you want to delete ${category.name}?`}
                                                        continue={async () => {
                                                            await deleteCategory({
                                                                variables: { id: category.id }
                                                            }).catch(err => {
                                                                setError(err);
                                                            });

                                                            if (error === null) {
                                                                setConfirmOpen(!confirmOpen);
                                                                toggleOverlay();
                                                            }
                                                        }}
                                                        cancel={() => {
                                                            setConfirmOpen(false);
                                                            toggleOverlay();
                                                        }}
                                                    />
                                                    <button type="button" onClick={confirmDelete} className="delete">
                                                        Delete
                                                    </button>
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
                    )}
                </AdminLayout>
            </AuthGateway>
        </>
    );
};

export default AdminCategories;
