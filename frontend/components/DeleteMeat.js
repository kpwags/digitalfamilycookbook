import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_MEAT_MUTATION } from '../mutations/Meat';
import { ALL_MEATS_QUERY } from '../queries/Meats';

class DeleteMeat extends Component {
    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.node
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_MEATS_QUERY });

        data.meats = data.meats.filter(meat => meat.id !== payload.data.deleteMeat.id);

        cache.writeQuery({ query: ALL_MEATS_QUERY, data });
    };

    render() {
        return (
            <Mutation mutation={DELETE_MEAT_MUTATION} variables={{ id: this.props.id }} update={this.update}>
                {(deleteMeat, { error }) => (
                    <button
                        type="button"
                        onClick={() => {
                            deleteMeat().catch(err => {
                                console.log(this.props.id);
                                console.log({ error, err });
                            });
                        }}
                    >
                        {this.props.children}
                    </button>
                )}
            </Mutation>
        );
    }
}

export { DeleteMeat };
