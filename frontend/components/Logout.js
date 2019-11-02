import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import styled from 'styled-components';
import { LOGOUT_MUTATION } from '../mutations/User';
import { CURRENT_USER_QUERY } from '../queries/User';

const LogoutLink = styled.a``;

const Logout = () => {
    const [logout] = useMutation(LOGOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    return (
        <LogoutLink
            onClick={e => {
                e.preventDefault();
                logout();
                Router.push({
                    pathname: '/'
                });
            }}
        >
            Log Out
        </LogoutLink>
    );
};

export { Logout };
