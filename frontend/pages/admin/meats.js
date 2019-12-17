import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CreateMeat } from '../../components/admin/meat/CreateMeat';
import { AuthGateway } from '../../components/AuthGateway';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { LoadingBox } from '../../components/elements/LoadingBox';
import { PageError } from '../../components/elements/PageError';
import { AdminGrid } from '../../components/styles/AdminGrid';
import { PageHeader } from '../../components/admin/elements/PageHeader';
import { AddButton } from '../../components/styles/AddButton';
import { HeaderForm } from '../../components/styles/HeaderForm';
import { Utilities } from '../../lib/Utilities';
import { DeleteMeat } from '../../components/admin/meat/DeleteMeat';
import { EditMeat } from '../../components/admin/meat/EditMeat';
import { AdminLayout } from '../../components/admin/AdminLayout/AdminLayout';

class AdminMeats extends Component {
    static showCreateMeatForm(e) {
        e.preventDefault();

        document.getElementById('create-meat-header-form').style.display = 'block';
        document.getElementById('add-meat-name').focus();
    }

    state = {
        selected: {
            id: '',
            name: ''
        }
    };

    showEditMeatForm(meat) {
        this.setState({ selected: meat });

        document.getElementById('edit-meat-header-form').style.display = 'block';
        document.getElementById('edit-meat-name').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/meats" permissionNeeded="ADMIN">
                    <AdminLayout activePage="meats">
                        <PageHeader title="Meats">
                            <AddButton>
                                <button onClick={AdminMeats.showCreateMeatForm} type="button">
                                    + Add
                                </button>
                            </AddButton>
                        </PageHeader>

                        <HeaderForm id="create-meat-header-form" width="500">
                            <CreateMeat />
                        </HeaderForm>

                        <HeaderForm id="edit-meat-header-form" width="500">
                            <EditMeat id={this.state.selected.id} name={this.state.selected.name} />
                        </HeaderForm>

                        <Query query={ALL_MEATS_QUERY}>
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
                                                Title: 'Error Loading Meats',
                                                Message: error
                                            }}
                                        />
                                    );

                                return (
                                    <AdminGrid>
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
                                                    data.meats.map(meat => (
                                                        <tr key={meat.id} id={`row_${meat.id}`}>
                                                            <td>{meat.name}</td>
                                                            <td>{Utilities.formatDate(meat.createdAt)}</td>
                                                            <td align="center">
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
                                                                <DeleteMeat id={meat.id} name={meat.name}>
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

export default AdminMeats;
