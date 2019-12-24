import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { Utilities } from '../../lib/Utilities';

class DeleteMeat extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_MEATS_QUERY });

        data.meats = data.meats.filter(meat => meat.id !== payload.data.deleteMeat.id);

        cache.writeQuery({ query: ALL_MEATS_QUERY, data });
    };

    confirmDelete = e => {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById(`confirm-meat-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, name } = this.props;

        return (
            <Mutation mutation={DELETE_MEAT_MUTATION} variables={{ id }} update={this.update}>
                {(deleteMeat, { error }) => (
                    <>
                        <ErrorAlert id={`delete-meat-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-meat-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            height="auto"
                            continue={async () => {
                                await deleteMeat().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById(`confirm-meat-delete-${id}`).style.display = 'none';
                                    document.getElementById('page-overlay').style.display = 'none';

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

export { DeleteMeat };
