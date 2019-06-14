import React, { Component } from 'react';
import { MeatsGrid } from '../../components/MeatsGrid';
import { AddButton } from '../../components/styles/AddButton';
import { CreateMeat } from '../../components/CreateMeat';
import { AuthGateway } from '../../components/AuthGateway';
import { ModalWindow } from '../../components/ModalWindow';

class AdminMeats extends Component {
    // eslint-disable-next-line class-methods-use-this
    showCreateMeatForm(e) {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('add-meat-window').style.display = 'block';
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/meats">
                    <h1>Manage Meats</h1>
                    <AddButton>
                        <button onClick={this.showCreateMeatForm} type="button">
                            Add New Meat
                        </button>
                    </AddButton>
                    <ModalWindow id="add-meat-window" width="500" height="215">
                        <CreateMeat />
                    </ModalWindow>
                    <MeatsGrid />
                </AuthGateway>
            </>
        );
    }
}

export default AdminMeats;
