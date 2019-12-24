import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_USER_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { Utilities } from '../../lib/Utilities';

class UserDelete extends Component {
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
        document.getElementById(`confirm-user-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, name } = this.props;

        return (
            <Mutation mutation={DELETE_USER_MUTATION} variables={{ id }} update={this.update}>
                {(deleteUser, { error }) => (
                    <>
                        <ErrorAlert id={`delete-user-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-user-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            continue={async () => {
                                await deleteUser().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById('page-overlay').style.display = 'none';
                                    document.getElementById(`confirm-user-delete-${this.props.id}`).style.display =
                                        'none';

                                    // remove row from table
                                    Utilities.deleteTableRow(`row_${id}`);
                                }
                            }}
                        />
                        <button type="button" onClick={this.confirmDelete} className="delete">
                            {this.props.children}
                        </button>
                    </>
                )}
            </Mutation>
        );
    }
}

export { UserDelete };
