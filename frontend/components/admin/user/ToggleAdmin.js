import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { TOGGLE_ADMIN_MUTATION } from '../../../mutations/User';
import { ALL_USERS_QUERY } from '../../../queries/User';
import { ErrorAlert } from '../../elements/ErrorAlert';

class ToggleAdmin extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    toggleAdmin = async (e, userId, toggleAdminMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        await toggleAdminMutation({
            variables: {
                id: userId
            }
        }).catch(err => {
            this.setState({ error: err });
        });
    };

    render() {
        return (
            <Mutation
                mutation={TOGGLE_ADMIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: ALL_USERS_QUERY }]}
            >
                {(toggleAdmin, { error }) => (
                    <>
                        <ErrorAlert id={`toggle-admin-${this.props.userId}`} error={error || this.state.error} />
                        <button
                            className="wide"
                            type="button"
                            data-id={this.props.userId}
                            onClick={e => {
                                this.toggleAdmin(e, this.props.userId, toggleAdmin);
                            }}
                        >
                            {this.props.children}
                        </button>
                    </>
                )}
            </Mutation>
        );
    }
}

export { ToggleAdmin };
