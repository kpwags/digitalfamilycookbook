import React, { Component } from 'react';
import { Trash } from '../../svg/Trash';

class Ingredient extends Component {
    state = {
        name: ''
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    deleteIngredient = e => {
        //e.preventDefault();
        alert('deleting?');
    }

    render() {
        return (
            <label htmlFor="name">
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="ingredient"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <a title="Delete Ingredient" onClick={this.deleteIngredient}>
                    <Trash width="32px" height="32px" className="delete-item" />
                </a>
            </label>
        );
    }
}

export { Ingredient };
