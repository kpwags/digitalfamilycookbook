import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_MEATS_QUERY } from '../queries/Meats';
import { AdminGrid } from './styles/AdminGrid';
import { DeleteMeat } from './DeleteMeat';
import { EditMeat } from './EditMeat';
import { ModalWindow } from './ModalWindow';

class MeatsGrid extends Component {
    state = {
        selected: {
            id: '',
            name: ''
        }
    };

    // eslint-disable-next-line class-methods-use-this
    showEditMeatForm(meat) {
        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('edit-meat-window').style.display = 'block';

        this.setState({ selected: { id: meat.id, name: meat.name } });
    }

    render() {
        return (
            <>
                <ModalWindow id="edit-meat-window" width="500" height="215">
                    <EditMeat id={this.state.selected.id} name={this.state.selected.name} />
                </ModalWindow>
                <AdminGrid cellPadding="0" cellSpacing="0" id="meatadmingrid">
                    <thead>
                        <tr>
                            <th width="70%">Name</th>
                            <th width="15%">&nbsp;</th>
                            <th width="15%">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Query query={ALL_MEATS_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <tr>
                                            <td colSpan="3">Loading...</td>
                                        </tr>
                                    );
                                if (error)
                                    return (
                                        <tr>
                                            <td colSpan="3">Error: {error.message}</td>
                                        </tr>
                                    );
                                return data.meats.length > 0 ? (
                                    data.meats.map(meat => (
                                        <tr key={meat.id}>
                                            <td>{meat.name}</td>
                                            <td align="right">
                                                <button
                                                    type="button"
                                                    data-id={meat.id}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.showEditMeatForm(meat);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td align="center">
                                                <DeleteMeat id={meat.id}>Delete</DeleteMeat>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            <em>No Meats Defined</em>
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

export { MeatsGrid };
