import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_MEAT_MUTATION } from '../mutations/Meat';
import { ALL_MEATS_QUERY } from '../queries/Meats';
import { ConfirmDialog } from './styles/ConfirmDialog';
import { ErrorAlert } from './ErrorAlert';

class DeleteMeat extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node
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
                        <ErrorAlert id={`delete-meat-error-${id}`} error={error} />
                        <ConfirmDialog
                            id={`confirm-meat-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            height="130"
                            continue={async () => {
                                await deleteMeat();
                                document.getElementById('page-overlay').style.display = 'none';
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

export { DeleteMeat };
