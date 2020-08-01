import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { AppContext } from '../AppContext/AppContext';

const SearchForm = styled.form`
    border-bottom: 1px solid ${(props) => props.theme.green};
    padding: 15px 50px;
    text-align: center;

    label {
        display: inline;
        color: ${(props) => props.theme.green};
        vertical-align: middle;
        font-size: 1rem;

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
                border-color: ${(props) => props.theme.green};
            }
        }

        button {
            background: ${(props) => props.theme.green};
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

const SearchBar = () => {
    const [keywords, setKeywords] = useState('');

    const { searchBarVisible, toggleSearchBar } = useContext(AppContext);

    const search = (e) => {
        e.preventDefault();
        toggleSearchBar();
        Router.push({
            pathname: '/search',
            query: { q: keywords },
        });
    };

    return (
        <SearchForm
            id="search-main"
            method="POST"
            onSubmit={(e) => {
                search(e);
            }}
            style={searchBarVisible ? { display: 'block' } : { display: 'none' }}
        >
            <label htmlFor="keywords">
                Search
                <input
                    type="search"
                    name="keywords"
                    onChange={(e) => {
                        setKeywords(e.target.value);
                    }}
                />
                <button type="submit">Search</button>
            </label>
        </SearchForm>
    );
};

export { SearchBar };
