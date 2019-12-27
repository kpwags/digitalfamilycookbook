import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { AddMeat } from '../../components/AddMeat/AddMeat';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AddButton } from '../../components/AddButton/AddButton';
import { HeaderForm } from '../../components/HeaderForm/HeaderForm';
import { Utilities } from '../../lib/Utilities';
import { DeleteMeat } from '../../components/DeleteMeat/DeleteMeat';
import { EditMeat } from '../../components/EditMeat/EditMeat';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';

class AdminMeats extends Component {
    static showAddMeatForm(e) {
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
                        <AdminHeader title="Meats">
                            <AddButton>
                                <button onClick={AdminMeats.showAddMeatForm} type="button">
                                    + Add
                                </button>
                            </AddButton>
                        </AdminHeader>

                        <HeaderForm id="create-meat-header-form" width="500">
                            <AddMeat />
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
                                    <Grid>
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

export default AdminMeats;
