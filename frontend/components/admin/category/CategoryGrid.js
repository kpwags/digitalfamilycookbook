import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_CATEGORIES_QUERY } from '../../../queries/Category';
import { AdminGrid } from '../../styles/AdminGrid';
import { ModalWindow } from '../../elements/ModalWindow';
import { EditCategory } from './EditCategory';
import { DeleteCategory } from './DeleteCategory';
import { LoadingBox } from '../../elements/LoadingBox';

class CategoryGrid extends Component {
    state = {
        selected: {
            id: '',
            name: ''
        }
    };

    showEditForm(category) {
        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('edit-category-window').style.display = 'block';
        document.getElementById('edit-category-name').focus();

        this.setState({ selected: { id: category.id, name: category.name } });
    }

    render() {
        const gridStyle = {
            width: '550px'
        };
        return (
            <>
                <ModalWindow id="edit-category-window" width="500" height="215">
                    <EditCategory id={this.state.selected.id} name={this.state.selected.name} />
                </ModalWindow>

                <AdminGrid cellPadding="0" cellSpacing="0" id="meatadmingrid" style={gridStyle}>
                    <thead>
                        <tr>
                            <th width="64%" className="no-border">
                                Name
                            </th>
                            <th width="18%" className="no-border">
                                &nbsp;
                            </th>
                            <th width="18%">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Query query={ALL_CATEGORIES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <tr>
                                            <td colSpan="3">
                                                <LoadingBox />
                                            </td>
                                        </tr>
                                    );
                                if (error)
                                    return (
                                        <tr>
                                            <td colSpan="3">Error: {error.message}</td>
                                        </tr>
                                    );
                                return data.categories.length > 0 ? (
                                    data.categories.map(category => (
                                        <tr key={category.id} id={category.id}>
                                            <td>{category.name}</td>
                                            <td align="center">
                                                <button
                                                    type="button"
                                                    data-id={category.id}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.showEditForm(category);
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
                                        <td colSpan="3">
                                            <em>No Categories Defined</em>
                                        </td>
                                    </tr>
                                );
                            }}
                        </Query>
                    </tbody>
                </AdminGrid>
            </>
        );
    }
}

export { CategoryGrid };
