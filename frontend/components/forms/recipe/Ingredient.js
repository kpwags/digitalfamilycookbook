import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trash } from '../../svg/Trash';

class Ingredient extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string
    };

    // state = {
    //     name: ''
    // };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    deleteIngredient = e => {
        // e.preventDefault();
        alert('deleting?');
    };

    render() {
        const { id, name } = this.props;

        return (

        );
    }
}

export { Ingredient };
