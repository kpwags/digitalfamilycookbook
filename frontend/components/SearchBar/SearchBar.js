import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const SearchForm = styled.form`
    display: none;
    border-bottom: 2px solid ${props => props.theme.darkGreen};
    padding: 15px 50px;
    text-align: center;

    label {
        display: inline;
        color: ${props => props.theme.green};
        vertical-align: middle;

        input[type='search'] {
            display: inline-block;
            width: 80%;
            padding: 0.5rem;
            margin: 0 25px 0 15px;
            font-size: 1rem;
            border: 1px solid hsl(0, 0%, 0%);
            border-radius: 6px;
            &:focus {
                outline: 0;
                border-color: ${props => props.theme.green};
            }
        }

        button {
            background: ${props => props.theme.green};
            border: none;
            cursor: pointer;
            color: hsl(0, 0%, 100%);
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 6px;
            vertical-align: middle;
        }
    }
`;

class SearchBar extends Component {
    state = {
        keywords: ''
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    search = e => {
        e.preventDefault();

        Router.push({
            pathname: '/search',
            query: { q: this.state.keywords }
        });
    };

    render() {
        return (
            <SearchForm
                id="search-main"
                method="POST"
                onSubmit={e => {
                    this.search(e);
                }}
            >
                <label htmlFor="keywords">
                    Search
                    <input type="search" name="keywords" id="keywords" onChange={this.handleChange} />
                    <button type="submit">Search</button>
                </label>
            </SearchForm>
        );
    }
}

export { SearchBar };
