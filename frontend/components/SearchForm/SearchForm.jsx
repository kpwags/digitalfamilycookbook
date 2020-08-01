import React, { useState } from 'react';
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

const SearchForm = props => {
    const [keywords, setKeywords] = useState(props.keywords);

    const search = e => {
        e.preventDefault();

        Router.push({
            pathname: '/search',
            query: { q: keywords },
        });
    };

    return (
        <Search
            method="POST"
            onSubmit={e => {
                search(e);
            }}
        >
            <label htmlFor="keywords">
                <input
                    type="search"
                    name="keywords"
                    id="keywords"
                    value={keywords}
                    onChange={e => {
                        setKeywords(e.target.value);
                    }}
                />
            </label>
            <button type="submit">Search</button>
        </Search>
    );
};

SearchForm.propTypes = {
    keywords: PropTypes.string,
};

export { SearchForm };
