import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CreateCategory } from '../../components/admin/category/CreateCategory';
import { AuthGateway } from '../../components/AuthGateway';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { LoadingBox } from '../../components/elements/LoadingBox';
import { PageError } from '../../components/elements/PageError';
import { AdminGrid } from '../../components/styles/AdminGrid';
import { PageHeader } from '../../components/admin/elements/PageHeader';
import { AddButton } from '../../components/styles/AddButton';
import { HeaderForm } from '../../components/styles/HeaderForm';
import { Utilities } from '../../lib/Utilities';
import { DeleteCategory } from '../../components/admin/category/DeleteCategory';
import { EditCategory } from '../../components/admin/category/EditCategory';
import { AdminLayout } from '../../components/admin/AdminLayout/AdminLayout';

class AdminCategories extends Component {
    static showCreateCategoryForm(e) {
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
                        <PageHeader title="Categories">
                            <AddButton>
                                <button onClick={AdminCategories.showCreateCategoryForm} type="button">
                                    + Add
                                </button>
                            </AddButton>
                        </PageHeader>

                        <HeaderForm id="create-category-header-form" width="500">
                            <CreateCategory />
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
                                    <AdminGrid>
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
                                    </AdminGrid>
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
