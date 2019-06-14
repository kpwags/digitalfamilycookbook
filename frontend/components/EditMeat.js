import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';
import { UPDATE_MEAT_MUTATION } from '../mutations/Meat';
import { ALL_MEATS_QUERY } from '../queries/Meats';

class EditMeat extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    state = {
        id: this.props.id,
        name: this.props.name
    };

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                id: this.props.id,
                name: this.props.name
            });
        }
    }

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    cancelEdit = () => {
        document.getElementById('edit-meat-window').style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
    };

    updateMeat = async (e, updateMeatMutation) => {
        e.preventDefault();

        await updateMeatMutation({
            variables: {
                id: this.state.id,
                name: this.state.name
            }
        });

        document.getElementById('edit-meat-window').style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
    };

    render() {
        return (
            <Mutation
                mutation={UPDATE_MEAT_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_MEATS_QUERY }]}
            >
                {(updateMeat, { loading, error }) => (
                    <Form
                        data-test="form"
                        onSubmit={e => {
                            this.updateMeat(e, updateMeat);
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
                            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                            <button type="button" onClick={this.cancelEdit}>
                                Cancel
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { EditMeat };
