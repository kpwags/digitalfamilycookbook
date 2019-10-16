import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../queries/User';
import { LoginForm } from './forms/user/LoginForm';
import { Homepage } from './Homepage';
import { requireLogin } from '../config';

const ContinueMessage = styled.h2`
    color: ${props => props.theme.darkGreen};
    text-align: center;
    font-style: italic;
`;

const InvalidPermissionsMessage = styled.p`
    color: #ff0000;
    text-align: center;
    font-style: italic;
`;

const AuthGateway = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
            if (loading) return <></>;

            if (requireLogin && !data.me) {
                return (
                    <div>
                        <ContinueMessage>Please sign in to continue</ContinueMessage>
                        <LoginForm redirectUrl={props.redirectUrl} />
                    </div>
                );
            }

            if (typeof props.permissionNeeded !== 'undefined' && !data.me) {
                return (
                    <div>
                        <ContinueMessage>Please sign in to continue</ContinueMessage>
                        <LoginForm redirectUrl={props.redirectUrl} />
                    </div>
                );
            }

            if (
                typeof props.permissionNeeded !== 'undefined' &&
                !data.me.permissions.includes(props.permissionNeeded)
            ) {
                return (
                    <>
                        <InvalidPermissionsMessage>
                            You do not have permission to access this page.
                        </InvalidPermissionsMessage>
                        <Homepage />
                    </>
                );
            }

            return props.children;
        }}
    </Query>
);

AuthGateway.propTypes = {
    redirectUrl: PropTypes.string,
    permissionNeeded: PropTypes.string,
    children: PropTypes.node
};

export { AuthGateway };
