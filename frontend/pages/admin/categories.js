import React, { Component } from 'react';
import { CategoriesGrid } from '../../components/admin/categories/CategoriesGrid';
import { AddButton } from '../../components/styles/AddButton';
import { CreateCategory } from '../../components/admin/categories/CreateCategory';
import { AuthGateway } from '../../components/AuthGateway';
import { ModalWindow } from '../../components/ModalWindow';

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
                <AuthGateway redirectUrl="/admin/categories">
                    <h1>Manage Categories</h1>
                    <AddButton>
                        <button onClick={AdminCategories.showCreateForm} type="button">
                            Add New Category
                        </button>
                    </AddButton>
                    <ModalWindow id="add-category-window" width="500" height="215">
                        <CreateCategory />
                    </ModalWindow>
                    <CategoriesGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminCategories;
