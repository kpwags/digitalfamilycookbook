import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { LoginForm } from './LoginForm';

const ContinueMessage = styled.h2`
    color: ${props => props.theme.darkGreen};
    text-align: center;
    font-style: italic;
`;

const AuthGateway = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (!data.me) {
                return (
                    <div>
                        <ContinueMessage>Please sign in to continue</ContinueMessage>
                        <LoginForm redirectUrl={props.redirectUrl} />
                    </div>
                );
            }

            return props.children;
        }}
    </Query>
);

AuthGateway.propTypes = {
    redirectUrl: PropTypes.string,
    children: PropTypes.node
};

export { AuthGateway };
