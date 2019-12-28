import React, { Component } from 'react';
import styled from 'styled-components';

const SearchForm = styled.div`
    display: none;
    border-bottom: 2px solid ${props => props.theme.darkGreen};
    padding: 15px 50px;
    text-align: center;

    label {
        display: inline;
        color: ${props => props.theme.green};

        input[type='search'] {
            display: inline-block;
            width: 80%;
            padding: 0.5rem;
            margin-left: 25px;
            font-size: 1.1rem;
            border: 1px solid hsl(0, 0%, 0%);
            border-radius: 6px;
            &:focus {
                outline: 0;
                border-color: ${props => props.theme.green};
            }
        }
    }
`;

class SearchBar extends Component {
    render() {
        return (
            <SearchForm id="search-main">
                <label htmlFor="keywords">
                    Search
                    <input type="search" name="keywords" />
                </label>
            </SearchForm>
        );
    }
}

export { SearchBar };
