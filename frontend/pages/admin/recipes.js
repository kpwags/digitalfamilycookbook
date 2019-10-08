import React, { Component } from 'react';
import { RecipeGrid } from '../../components/admin/recipe/RecipeGrid';
import { AuthGateway } from '../../components/AuthGateway';

class AdminRecipes extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/recipes" permissionNeeded="ADMIN">
                    <h1>Manage Recipes</h1>
                    <RecipeGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminRecipes;
