import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { CREATE_INVITATION_CODE_MUTATION } from '../../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY } from '../../../queries/InvitationCode';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class CreateInvitationCode extends Component {
    state = {
        code: '',
        error: null
    };

    handleCodeChange = debounce(async (e, client) => {
        e.preventDefault();

        this.setState({ code: e.target.value });

        const res = await client.query({
            query: SINGLE_INVITATION_CODE_CODE_QUERY,
            variables: { code: this.state.code }
        });

        const { valid, message } = FormValidator.validateInvitationCode(this.state.code);

        if (res.data.invitationCode !== null) {
            Utilities.invalidateField('add-invitation-code-code', 'Inivation code already exists');
        } else if (!valid) {
            Utilities.invalidateField('add-invitation-code-code', message);
        } else {
            Utilities.resetField('add-invitation-code-code');
        }
    }, 350);

    hideAddForm = () => {
        document.getElementById('create-invitation-code-header-form').style.display = 'none';
        this.setState({ code: '' });
        document.getElementById('create-invitation-code-form').reset();
    };

    cancelAddInvitationCode = e => {
        e.preventDefault();
        this.hideAddForm();
    };

    validateForm = () => {
        const { valid, message } = FormValidator.validateInvitationCode(this.state.code);
        if (!valid) {
            Utilities.invalidateField('add-invitation-code-code', message);
        }

        return valid;
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_INVITATION_CODE_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_INVITATION_CODES_QUERY }]}
            >
                {(createInvitationCode, { loading, error }) => (
                    <Form
                        data-test="form"
                        id="create-invitation-code-form"
                        onSubmit={async e => {
                            e.preventDefault();

                            this.setState({ error: null });

                            if (this.validateForm()) {
                                await createInvitationCode().catch(err => {
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
                            <ApolloConsumer>
                                {client => (
                                    <label htmlFor="code">
                                        Code
                                        <input
                                            type="text"
                                            id="add-invitation-code-code"
                                            name="code"
                                            maxLength="20"
                                            onChange={e => {
                                                e.persist();
                                                this.handleCodeChange(e, client);
                                            }}
                                        />
                                        <div className="error-text" id="add-invitation-code-code-message" />
                                    </label>
                                )}
                            </ApolloConsumer>
                            <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                            <button type="button" onClick={this.cancelAddInvitationCode}>
                                Cancel
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { CreateInvitationCode };
