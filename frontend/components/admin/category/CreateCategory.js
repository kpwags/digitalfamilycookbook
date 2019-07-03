import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../ErrorMessage';
import { CREATE_CATEGORY_MUTATION } from '../../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../../queries/Category';

class CreateCategory extends Component {
    state = {
        name: '',
        error: null
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    hideAddForm = () => {
        document.getElementById('add-category-window').style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
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

                            await createCategory().catch(err => {
                                this.setState({ error: err });
                            });

                            if (this.state.error === null) {
                                this.hideAddForm();
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
                                />
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

export { CreateCategory };
