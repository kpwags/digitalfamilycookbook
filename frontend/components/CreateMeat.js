import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';
import { CREATE_MEAT_MUTATION } from '../mutations/Meat';
import { ALL_MEATS_QUERY } from '../queries/Meats';

class CreateMeat extends Component {
    state = {
        name: ''
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
                        onSubmit={async e => {
                            e.preventDefault();
                            await createMeat();
                            this.hideAddForm();
                        }}
                    >
                        <ErrorMessage error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="name"
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
