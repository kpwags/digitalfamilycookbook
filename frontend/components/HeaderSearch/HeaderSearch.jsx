import { useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const HeaderSearchForm = styled.form`
    margin: 0 0 0 20px;
    padding: 0;
    float: left;
    line-height: 70px;
    vertical-align: middle;

    input {
        width: 250px;
        display: inline-block;
        padding: 0.4rem 0.5rem;
        margin: 0;
        font-size: 1rem;
        border: 1px solid ${(props) => props.theme.darkGreen};
        border-radius: 0px;
        vertical-align: middle;

        &:focus {
            border-color: ${(props) => props.theme.lightGreen};
        }

        @media all and (min-width: 1600px) {
            width: 400px;
            margin-left: 40px;
        }
    }

    @media all and (max-width: 1300px) {
        display: none;
    }
`;

const HeaderSearch = () => {
    const [keywords, setKeywords] = useState('');

    const search = (e) => {
        e.preventDefault();
        Router.push({
            pathname: '/search',
            query: { q: keywords },
        });
    };

    return (
        <HeaderSearchForm
            onSubmit={(e) => {
                search(e);
            }}
        >
            <input
                type="search"
                name="keywords"
                placeholder="Search Recipes"
                onChange={(e) => {
                    setKeywords(e.target.value);
                }}
            />
        </HeaderSearchForm>
    );
};

export { HeaderSearch };
