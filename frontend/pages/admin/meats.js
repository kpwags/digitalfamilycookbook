import React, { Component } from 'react';
import { MeatGrid } from '../../components/admin/meat/MeatGrid';
import { AddButton } from '../../components/styles/AddButton';
import { CreateMeat } from '../../components/admin/meat/CreateMeat';
import { AuthGateway } from '../../components/AuthGateway';
import { ModalWindow } from '../../components/elements/ModalWindow';

class AdminMeats extends Component {
    // eslint-disable-next-line class-methods-use-this
    showCreateMeatForm(e) {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('add-meat-window').style.display = 'block';
        document.getElementById('add-meat-name').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/meats" permissionNeeded="ADMIN">
                    <h1>Manage Meats</h1>
                    <AddButton>
                        <button onClick={this.showCreateMeatForm} type="button">
                            Add New Meat
                        </button>
                    </AddButton>
                    <ModalWindow id="add-meat-window" width="500" height="215">
                        <CreateMeat />
                    </ModalWindow>
                    <MeatGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminMeats;
