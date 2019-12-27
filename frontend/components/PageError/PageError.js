import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

const PageErrorStyles = styled.div`
    padding: 2rem;
    background: hsl(0, 0%, 100%);
    margin: 2rem 0;
    border: 1px solid hsla(0, 0%, 0%, 0.05);
    border-left: 5px solid red;
    h1 {
        margin: 0 0 20px;
    }
    p {
        margin: 0;
        font-weight: 100;
    }
    strong {
        margin-right: 1rem;
    }
`;

const PageError = ({ error }) => {
    return (
        <PageErrorStyles>
            <h1>{error.Title}</h1>
            <p data-test="page-error">{error.Message}</p>
            <p>
                <a
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                        Router.back();
                    }}
                    onKeyDown={e => {
                        e.preventDefault();
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            Router.back();
                        }
                    }}
                >
                    Go Back
                </a>
            </p>
        </PageErrorStyles>
    );
};

PageError.defaultProps = {
    error: {
        Title: 'Error',
        Message: 'An error has occurred'
    }
};

PageError.propTypes = {
    error: PropTypes.object
};

export { PageError };
