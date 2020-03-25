import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Success = styled.div`
    padding: 2rem;
    background: white;
    margin: 2rem 0;
    border-left: 5px solid hsl(117, 96%, 31%);
    color: hsl(117, 96%, 31%);
    ${props => (props.message !== null || props.message !== '' ? 'display: block' : 'display: none')};
    p {
        margin: 0;
        font-weight: 100;
    }
    strong {
        margin-right: 1rem;
    }
`;

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <Success message="message">
            <p data-test="graphql-success">{message}</p>
        </Success>
    );
};

SuccessMessage.defaultProps = {
    message: null
};

SuccessMessage.propTypes = {
    message: PropTypes.string
};

export { SuccessMessage };
