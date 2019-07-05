import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { UPDATE_CATEGORY_MUTATION } from '../../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../../queries/Category';

class EditCategory extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    state = {
        id: this.props.id,
        name: this.props.name,
        error: null
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
        document.getElementById('edit-category-window').style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
    };

    updateCategory = async (e, updateCategoryMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        await updateCategoryMutation({
            variables: {
                id: this.state.id,
                name: this.state.name
            }
        }).catch(err => {
            this.setState({ error: err });
        });

        if (this.state.error === null) {
            document.getElementById('edit-category-window').style.display = 'none';
            document.getElementById('page-overlay').style.display = 'none';
        }
    };

    render() {
        return (
            <Mutation
                mutation={UPDATE_CATEGORY_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_CATEGORIES_QUERY }]}
            >
                {(updateCategory, { loading, error }) => (
                    <Form
                        data-test="form"
                        onSubmit={e => {
                            this.updateCategory(e, updateCategory);
                        }}
                    >
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="edit-category-name"
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

export { EditCategory };
