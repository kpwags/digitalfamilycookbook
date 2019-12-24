import React, { Component } from 'react';
import { Query } from 'react-apollo';
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

class AdminCategories extends Component {
    static showAddCategoryForm(e) {
        e.preventDefault();

        document.getElementById('create-category-header-form').style.display = 'block';
        document.getElementById('add-category-name').focus();
    }

    state = {
        selected: {
            id: '',
            name: ''
        }
    };

    showEditCatetgoryForm(category) {
        this.setState({ selected: category });

        document.getElementById('edit-category-header-form').style.display = 'block';
        document.getElementById('edit-category-name').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/categories" permissionNeeded="ADMIN">
                    <AdminLayout activePage="categories">
                        <AdminHeader title="Categories">
                            <AddButton>
                                <button onClick={AdminCategories.showAddCategoryForm} type="button">
                                    + Add
                                </button>
                            </AddButton>
                        </AdminHeader>

                        <HeaderForm id="create-category-header-form" width="500">
                            <AddCategory />
                        </HeaderForm>

                        <HeaderForm id="edit-category-header-form" width="500">
                            <EditCategory id={this.state.selected.id} name={this.state.selected.name} />
                        </HeaderForm>

                        <Query query={ALL_CATEGORIES_QUERY}>
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
                                                Title: 'Error Loading Categories',
                                                Message: error
                                            }}
                                        />
                                    );

                                return (
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
                                                                        this.showEditCatetgoryForm(category);
                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                            <td align="center">
                                                                <DeleteCategory id={category.id} name={category.name}>
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
                                );
                            }}
                        </Query>
                    </AdminLayout>
                </AuthGateway>
            </>
        );
    }
}

export default AdminCategories;
