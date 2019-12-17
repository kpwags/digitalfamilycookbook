import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { UPDATE_MEAT_MUTATION } from '../../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../../queries/Meat';
import { Utilities } from '../../../lib/Utilities';
import { FormValidator } from '../../../lib/FormValidator';

class EditMeat extends Component {
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
                    document.getElementById('edit-meat-name').value = this.props.name;
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

    cancelEdit = () => {
        Utilities.resetField('edit-meat-name');
        document.getElementById('edit-meat-header-form').style.display = 'none';
    };

    validate = (fieldId, value) => {
        // eslint-disable-next-line default-case
        switch (fieldId) {
        case 'edit-meat-name':
            if (!FormValidator.validateNotEmpty(value)) {
                Utilities.invalidateField('edit-meat-name', 'Name is required.');
            } else {
                Utilities.resetField('edit-meat-name');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;

        let { name } = this.state;
        if (name === '') {
            name = document.getElementById('edit-meat-name').value;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('edit-meat-name', 'Name is required.');
            isValid = false;
        }

        return isValid;
    };

    updateMeat = async (e, updateMeatMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        if (this.validateForm()) {
            await updateMeatMutation({
                variables: {
                    id: this.state.id,
                    name: this.state.name
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            if (this.state.error === null) {
                Utilities.resetField('edit-meat-name');
                document.getElementById('edit-meat-header-form').style.display = 'none';
            }
        }
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
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="edit-meat-name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <div className="error-text" id="edit-meat-name-message" />
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
