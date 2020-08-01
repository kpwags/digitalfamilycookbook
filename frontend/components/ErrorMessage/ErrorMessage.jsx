import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
    padding: 2rem;
    background: hsl(0, 0%, 100%);
    margin: 2rem 0;
    border: 1px solid hsla(0, 0%, 0%, 0.05);
    border-left: 5px solid red;
    ${props => (props.message !== null || props.message !== '' ? 'display: block' : 'display: none')};
    p {
        margin: 0;
        font-weight: 100;
    }
    strong {
        margin-right: 1rem;
    }
`;

const ErrorMessage = ({ error }) => {
    if (!error || !error.message) return null;

    if (typeof error === 'string') {
        return (
            <ErrorStyles message={error}>
                <p data-test="graphql-error">{error}</p>
            </ErrorStyles>
        );
    }

    if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
        return error.networkError.result.errors.map((err, i) => (
            <ErrorStyles key={i} message={err.message.replace('GraphQL error: ', '')}>
                <p data-test="graphql-error">{err.message.replace('GraphQL error: ', '')}</p>
            </ErrorStyles>
        ));
    }

    let errorMessage = error.message.replace('GraphQL error: ', '');

    if (errorMessage.indexOf('A unique constraint would be violated') !== -1) {
        if (errorMessage.indexOf('Field name = username') !== -1) {
            errorMessage = 'The username you selected is already in use, please choose another one.';
        } else if (errorMessage.indexOf('Field name = email') !== -1) {
            errorMessage = 'It seems like you have already signed up for an account. Did you forget your password?';
        } else if (errorMessage.indexOf('Field name = code') !== -1) {
            errorMessage = 'It seems like you have already created this invitation code';
        }
    }

    return (
        <ErrorStyles message={errorMessage}>
            <p data-test="graphql-error">{errorMessage}</p>
        </ErrorStyles>
    );
};

ErrorMessage.defaultProps = {
    error: {}
};

ErrorMessage.propTypes = {
    error: PropTypes.object
};

export { ErrorMessage };
