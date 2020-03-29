import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { LoginForm } from '../LoginForm/LoginForm';
import { requireLogin } from '../../config';
import { LoadingBox } from '../LoadingBox/LoadingBox';

const ContinueMessage = styled.h2`
    color: ${props => props.theme.darkGreen};
    text-align: center;
    font-style: italic;
`;

const InvalidPermissionsMessage = styled.p`
    color: hsl(0, 100%, 50%);
    text-align: center;
    font-style: italic;
`;

const AuthGateway = props => {
    const { permissionNeeded = null, redirectUrl = '/' } = props;

    const { data, loading } = useQuery(CURRENT_USER_QUERY);

    if (loading) return <LoadingBox />;

    if (requireLogin && !data.me) {
        return (
            <div>
                <ContinueMessage data-test="continue-message">Please sign in to continue</ContinueMessage>
                <LoginForm redirectUrl={redirectUrl} />
            </div>
        );
    }

    if (permissionNeeded !== null && !data.me) {
        return (
            <div>
                <ContinueMessage data-test="continue-message">Please sign in to continue</ContinueMessage>
                <LoginForm redirectUrl={redirectUrl} />
            </div>
        );
    }

    if (permissionNeeded !== null && !data.me.permissions.includes(permissionNeeded)) {
        return (
            <>
                <InvalidPermissionsMessage data-test="invalid-permissions-message">
                    You do not have permission to access this page.
                </InvalidPermissionsMessage>
            </>
        );
    }

    return props.children;
};

AuthGateway.propTypes = {
    redirectUrl: PropTypes.string,
    permissionNeeded: PropTypes.string,
    children: PropTypes.node
};

export { AuthGateway };
