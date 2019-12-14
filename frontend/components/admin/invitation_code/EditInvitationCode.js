import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { UPDATE_INVITATION_CODE_MUTATION } from '../../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY } from '../../../queries/InvitationCode';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class EditInvitationCode extends Component {
    handleCodeChange = debounce(async (e, client) => {
        this.setState({ code: e.target.value });

        const res = await client.query({
            query: SINGLE_INVITATION_CODE_CODE_QUERY,
            variables: { code: this.state.code }
        });

        const { valid, message } = FormValidator.validateInvitationCode(this.state.code);

        if (res.data.invitationCode !== null && res.data.invitationCode.id !== this.state.id) {
            Utilities.invalidateField('edit-invitation-code-code', 'Invitation code already exists');
        } else if (!valid) {
            Utilities.invalidateField('edit-invitation-code-code', message);
        } else {
            Utilities.resetField('edit-invitation-code-code');
        }
    }, 350);

    static propTypes = {
        id: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.id !== prevState.id) {
            return { id: nextProps.id, code: nextProps.code };
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            code: this.props.code,
            error: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(
                {
                    id: this.props.id,
                    code: this.props.code
                },
                () => {
                    document.getElementById('edit-invitation-code-code').value = this.props.code;
                }
            );
        }
    }

    cancelEdit = () => {
        Utilities.resetField('edit-invitation-code-code');
        document.getElementById('edit-invitation-code-header-form').style.display = 'none';
    };

    updateInvitationCode = async (e, updateInvitationCodeMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        if (this.validateForm()) {
            await updateInvitationCodeMutation({
                variables: {
                    id: this.state.id,
                    code: this.state.code
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            if (this.state.error === null) {
                Utilities.resetField('edit-invitation-code-code');
                document.getElementById('edit-invitation-code-header-form').style.display = 'none';
            }
        }
    };

    validateForm = () => {
        const { valid, message } = FormValidator.validateInvitationCode(this.state.code);
        if (!valid) {
            Utilities.invalidateField('edit-invitation-code-code', message);
        }

        return valid;
    };

    render() {
        return (
            <Mutation
                mutation={UPDATE_INVITATION_CODE_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_INVITATION_CODES_QUERY }]}
            >
                {(updateInvitationCode, { loading, error }) => (
                    <Form
                        data-test="form"
                        onSubmit={e => {
                            this.updateInvitationCode(e, updateInvitationCode);
                        }}
                    >
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <ApolloConsumer>
                                {client => (
                                    <label htmlFor="code">
                                        Code
                                        <input
                                            type="text"
                                            id="edit-invitation-code-code"
                                            name="code"
                                            maxLength="20"
                                            defaultValue={this.props.code}
                                            onChange={e => {
                                                e.persist();
                                                this.handleCodeChange(e, client);
                                            }}
                                        />
                                        <div className="error-text" id="edit-invitation-code-code-message" />
                                    </label>
                                )}
                            </ApolloConsumer>
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

export { EditInvitationCode };
