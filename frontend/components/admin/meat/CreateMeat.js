import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { CREATE_MEAT_MUTATION } from '../../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../../queries/Meat';

class CreateMeat extends Component {
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
        document.getElementById('add-meat-window').style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
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

                            await createMeat().catch(err => {
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
                                    id="add-meat-name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
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

export { CreateMeat };
