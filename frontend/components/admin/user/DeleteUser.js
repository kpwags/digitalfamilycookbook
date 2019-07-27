import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_USER_MUTATION } from '../../../mutations/User';
import { ALL_USERS_QUERY } from '../../../queries/User';
import { ConfirmDialog } from '../../styles/ConfirmDialog';
import { ErrorAlert } from '../../elements/ErrorAlert';

class DeleteUser extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_USERS_QUERY });

        data.users = data.users.filter(meat => meat.id !== payload.data.deleteUser.id);

        cache.writeQuery({ query: ALL_USERS_QUERY, data });
    };

    confirmDelete = e => {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById(`confirm-meat-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, name } = this.props;

        return (
            <Mutation mutation={DELETE_USER_MUTATION} variables={{ id }} update={this.update}>
                {(deleteUser, { error }) => (
                    <>
                        <ErrorAlert id={`delete-user-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-meat-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            height="130"
                            continue={async () => {
                                await deleteUser().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById('page-overlay').style.display = 'none';
                                }
                            }}
                        />
                        <button type="button" onClick={this.confirmDelete}>
                            {this.props.children}
                        </button>
                    </>
                )}
            </Mutation>
        );
    }
}

export { DeleteUser };
