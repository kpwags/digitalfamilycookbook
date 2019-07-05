import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SINGLE_USER_USERNAME_QUERY } from '../queries/User';
import { ErrorMessage } from './elements/ErrorMessage';

const ProfileDetails = styled.div`
    width: 800px;
    margin: 30px auto 0;
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

        div.image {
            grid-column-start: 1;
            grid-column-end: 1;
        }

        div.details {
            grid-column-start: 2;

            h2 {
                line-height: 1;
                margin: 0 0 5px;
                padding: 0;
                color: ${props => props.theme.green};
            }

            div.username {
                font-size: 18px;
                color: ${props => props.theme.lightGreen};
                margin: 0 0 16px;
            }
        }
    }
`;

class ViewProfile extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired
    };

    render() {
        return (
            <Query
                query={SINGLE_USER_USERNAME_QUERY}
                variables={{
                    username: this.props.username
                }}
            >
                {({ error, loading, data }) => {
                    if (error) return <ErrorMessage error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if (!data.user) return <p>No User Found for {this.props.username}</p>;

                    const { user } = data;
                    return (
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
                    );
                }}
            </Query>
        );
    }
}

export { ViewProfile };
