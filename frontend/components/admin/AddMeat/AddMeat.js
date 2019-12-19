import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { CREATE_MEAT_MUTATION } from '../../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../../queries/Meat';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class AddMeat extends Component {
    state = {
        name: '',
        error: null
    };

    handleChange = e => {
        const { id, name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val }, () => {
            this.validate(id, val);
        });
    };

    validate = (fieldId, value) => {
        // eslint-disable-next-line default-case
        switch (fieldId) {
        case 'add-meat-name':
            if (!FormValidator.validateNotEmpty(value)) {
                Utilities.invalidateField('add-meat-name', 'Name is required.');
            } else {
                Utilities.resetField('add-meat-name');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;

        let { name } = this.state;
        if (name === '') {
            name = document.getElementById('add-meat-name').value;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('add-meat-name', 'Name is required.');
            isValid = false;
        }

        return isValid;
    };

    hideAddForm = () => {
        document.getElementById('create-meat-header-form').style.display = 'none';
        this.setState({ name: '' });
        document.getElementById('create-meat-form').reset();
    };

    cancelAddMeat = e => {
        e.preventDefault();
        this.hideAddForm();
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_MEAT_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_MEATS_QUERY }]}
            >
                {(createMeat, { loading, error }) => (
                    <Form
                        data-test="form"
                        method="POST"
                        id="create-meat-form"
                        onSubmit={async e => {
                            e.preventDefault();

                            this.setState({ error: null });

                            if (this.validateForm()) {
                                await createMeat().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    this.hideAddForm();
                                }
                            }
                        }}
                    >
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="add-meat-name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    onBlur={e => {
                                        e.preventDefault();
                                        this.validate('add-meat-name', this.state.name);
                                    }}
                                />
                                <div className="error-text" id="add-meat-name-message" />
                            </label>
                            <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                            <button type="button" onClick={this.cancelAddMeat}>
                                Cancel
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { AddMeat };
