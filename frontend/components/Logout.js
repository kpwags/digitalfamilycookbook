import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { LOGOUT_MUTATION } from '../mutations/Logout';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';

const LogoutLink = styled.a``;

const Logout = () => (
    <Mutation mutation={LOGOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {logout => <LogoutLink onClick={logout}>Log Out</LogoutLink>}
    </Mutation>
);

export { Logout };
