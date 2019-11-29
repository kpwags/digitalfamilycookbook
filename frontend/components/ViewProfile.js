import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SINGLE_USER_USERNAME_QUERY } from '../queries/User';
import { LoadingBox } from './elements/LoadingBox';
import { PageError } from './elements/PageError';
import { User } from './recipes/User';

const ProfileDetails = styled.div`
    width: 800px;
    margin: 30px auto 30px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.8rem;
    line-height: 1.5;

    div.user-details {
        display: grid;
        grid-template-columns: 128px auto;
        grid-column-gap: 25px;

        @media all and (max-width: 400px) {
            display: block;
        }

        div.image {
            grid-column-start: 1;
            grid-column-end: 1;

            @media all and (max-width: 400px) {
                display: block;
                width: 100%;
                text-align: center;
                margin-bottom: 15px;
            }
        }

        div.details {
            grid-column-start: 2;

            h2 {
                line-height: 1;
                margin: 0 0 5px;
                padding: 0;
                color: ${props => props.theme.green};

                @media all and (max-width: 400px) {
                    text-align: center;
                }
            }

            div.username {
                font-size: 18px;
                color: ${props => props.theme.lightGreen};
                margin: 0 0 16px;

                @media all and (max-width: 400px) {
                    text-align: center;
                }
            }
        }
    }

    @media all and (max-width: 800px) {
        width: 100%;
    }
`;

const ViewProfile = props => {
    const { data, error, loading } = useQuery(SINGLE_USER_USERNAME_QUERY, { variables: { username: props.username } });

    if (loading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Viewing Profile',
                    Message: error
                }}
            />
        );
    if (!data.user)
        return (
            <PageError
                error={{
                    Title: 'Error Viewing Profile',
                    Message: `No User Found for ${props.username}`
                }}
            />
        );

    const { user } = data;
    return (
        <>
            <ProfileDetails>
                <Head>
                    <title>Digital Family Cookbook | {user.name}</title>
                </Head>
                <div className="user-details">
                    <div className="image">
                        <img src={user.image} alt={user.name} />
                    </div>
                    <div className="details">
                        <h2>{user.name}</h2>
                        <div className="username">@{user.username}</div>
                        <p>{user.bio}</p>
                    </div>
                </div>
            </ProfileDetails>
            <User id={user.id} />
        </>
    );
};

ViewProfile.propTypes = {
    username: PropTypes.string.isRequired
};

export { ViewProfile };
