import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

const Search = styled.form`
    width: 600px;
    margin: 20px auto 40px;
    text-align: center;

    input {
        width: 400px;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid hsl(0, 0%, 0%);
        border-radius: 3px;
        margin-right: 15px;
        &:focus {
            outline: 0;
            border-color: ${props => props.theme.green};
        }

        @media all and (max-width: 600px) {
            width: 220px;
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

    @media all and (max-width: 600px) {
        width: 320px;
    }
`;

class SearchForm extends Component {
    static propTypes = {
        keywords: PropTypes.string
    };

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

        let searchTerms = this.state.keywords;
        if (searchTerms === '') {
            searchTerms = document.getElementById('keywords').value;
            this.setState({ keywords: searchTerms });
        }

        Router.push({
            pathname: '/search',
            query: { q: searchTerms }
        });
    };

    render() {
        const { keywords } = this.props;

        return (
            <Search
                method="POST"
                onSubmit={e => {
                    this.search(e);
                }}
            >
                <label htmlFor="keywords">
                    <input
                        type="search"
                        name="keywords"
                        id="keywords"
                        defaultValue={keywords}
                        onChange={this.handleChange}
                    />
                </label>
                <button type="submit">Search</button>
            </Search>
        );
    }
}

export { SearchForm };
