import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { UPDATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { Utilities } from '../../lib/Utilities';
import { FormValidator } from '../../lib/FormValidator';

class EditCategory extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.id !== prevState.id) {
            return { id: nextProps.id, name: nextProps.name };
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            error: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(
                {
                    id: this.props.id,
                    name: this.props.name
                },
                () => {
                    document.getElementById('edit-category-name').value = this.props.name;
                }
            );
        }
    }

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
            case 'edit-category-name':
                if (!FormValidator.validateNotEmpty(value)) {
                    Utilities.invalidateField('edit-category-name', 'Name is required.');
                } else {
                    Utilities.resetField('edit-category-name');
                }
                break;
        }
    };

    validateForm = () => {
        let isValid = true;

        let { name } = this.state;
        if (name === '') {
            name = document.getElementById('edit-category-name').value;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('edit-category-name', 'Name is required.');
            isValid = false;
        }

        return isValid;
    };

    cancelEdit = () => {
        Utilities.resetField('edit-category-name');
        document.getElementById('edit-category-header-form').style.display = 'none';
    };

    updateCategory = async (e, updateCategoryMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        if (this.validateForm()) {
            await updateCategoryMutation({
                variables: {
                    id: this.state.id,
                    name: this.state.name
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            if (this.state.error === null) {
                Utilities.resetField('edit-category-name');
                document.getElementById('edit-category-header-form').style.display = 'none';
            }
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
                                    onBlur={e => {
                                        e.preventDefault();
                                        this.validate('edit-category-name', this.state.name);
                                    }}
                                />
                                <div className="error-text" id="edit-category-name-message" />
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
