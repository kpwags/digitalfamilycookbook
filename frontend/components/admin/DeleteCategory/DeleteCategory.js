import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_CATEGORY_MUTATION } from '../../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../../queries/Category';
import { ConfirmDialog } from '../../styles/ConfirmDialog';
import { ErrorAlert } from '../../elements/ErrorAlert';
import { Utilities } from '../../../lib/Utilities';

class DeleteCategory extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_CATEGORIES_QUERY });

        data.categories = data.categories.filter(meat => meat.id !== payload.data.deleteCategory.id);

        cache.writeQuery({ query: ALL_CATEGORIES_QUERY, data });
    };

    confirmDelete = e => {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById(`confirm-category-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, name } = this.props;

        return (
            <Mutation mutation={DELETE_CATEGORY_MUTATION} variables={{ id }} update={this.update}>
                {(deleteCategory, { error }) => (
                    <>
                        <ErrorAlert id={`delete-category-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-category-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            continue={async () => {
                                await deleteCategory().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById(`confirm-category-delete-${id}`).style.display = 'none';
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

export { DeleteCategory };
