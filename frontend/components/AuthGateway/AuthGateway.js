import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../AppContext/AppContext';
import { LoginForm } from '../LoginForm/LoginForm';
import { requireLogin } from '../../config';

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

    const { loggedInUser } = useContext(AppContext);

    if (requireLogin && !loggedInUser) {
        return (
            <div>
                <ContinueMessage data-test="continue-message">Please sign in to continue</ContinueMessage>
                <LoginForm redirectUrl={redirectUrl} />
            </div>
        );
    }

    if (permissionNeeded !== null && !loggedInUser) {
        return (
            <div>
                <ContinueMessage data-test="continue-message">Please sign in to continue</ContinueMessage>
                <LoginForm redirectUrl={redirectUrl} />
            </div>
        );
    }

    if (permissionNeeded !== null && !loggedInUser.permissions.includes(permissionNeeded)) {
        return (
            <>
                <InvalidPermissionsMessage data-test="invalid-permissions-message">You do not have permission to access this page.</InvalidPermissionsMessage>
            </>
        );
    }

    return props.children;
};

AuthGateway.propTypes = {
    redirectUrl: PropTypes.string,
    permissionNeeded: PropTypes.string,
    children: PropTypes.node,
};

export { AuthGateway };
