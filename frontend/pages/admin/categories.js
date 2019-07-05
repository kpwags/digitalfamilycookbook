import React, { Component } from 'react';
import { CategoryGrid } from '../../components/admin/category/CategoryGrid';
import { AddButton } from '../../components/styles/AddButton';
import { CreateCategory } from '../../components/admin/category/CreateCategory';
import { AuthGateway } from '../../components/AuthGateway';
import { ModalWindow } from '../../components/elements/ModalWindow';

class AdminCategories extends Component {
    static showCreateForm(e) {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('add-category-window').style.display = 'block';
        document.getElementById('add-category-name').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/categories" permissionNeeded="ADMIN">
                    <h1>Manage Categories</h1>
                    <AddButton>
                        <button onClick={AdminCategories.showCreateForm} type="button">
                            Add New Category
                        </button>
                    </AddButton>
                    <ModalWindow id="add-category-window" width="500" height="215">
                        <CreateCategory />
                    </ModalWindow>
                    <CategoryGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminCategories;
