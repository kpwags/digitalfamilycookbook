import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { FormValidator } from '../../lib/FormValidator';
import { Utilities } from '../../lib/Utilities';

class AddCategory extends Component {
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
        case 'add-category-name':
            if (!FormValidator.validateNotEmpty(value)) {
                Utilities.invalidateField('add-category-name', 'Name is required.');
            } else {
                Utilities.resetField('add-category-name');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;

        let { name } = this.state;
        if (name === '') {
            name = document.getElementById('add-category-name').value;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('add-category-name', 'Name is required.');
            isValid = false;
        }

        return isValid;
    };

    hideAddForm = () => {
        document.getElementById('create-category-header-form').style.display = 'none';
        this.setState({ name: '' });
        document.getElementById('create-category-form').reset();
    };

    cancelAdd = e => {
        e.preventDefault();
        this.hideAddForm();
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_CATEGORY_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_CATEGORIES_QUERY }]}
            >
                {(createCategory, { loading, error }) => (
                    <Form
                        data-test="form"
                        id="create-category-form"
                        onSubmit={async e => {
                            e.preventDefault();

                            this.setState({ error: null });

                            if (this.validateForm()) {
                                await createCategory().catch(err => {
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
                                    id="add-category-name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    onBlur={e => {
                                        e.preventDefault();
                                        this.validate('add-category-name', this.state.name);
                                    }}
                                />
                                <div className="error-text" id="add-category-name-message" />
                            </label>
                            <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                            <button type="button" onClick={this.cancelAdd}>
                                Cancel
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { AddCategory };
