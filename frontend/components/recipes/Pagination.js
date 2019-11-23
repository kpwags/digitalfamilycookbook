import styled from 'styled-components';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { perPage, siteTitle } from '../../config';
import { Center } from '../styles/Center';
import {
    RECIPE_BY_CATEGORY_PAGINATION_QUERY,
    ALL_RECIPES_PAGINATION_QUERY,
    RECIPE_BY_MEAT_PAGINATION_QUERY
} from '../../queries/Recipe';
import { ErrorMessage } from '../elements/ErrorMessage';

const PaginationStyles = styled.div`
    text-align: center;
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: stretch;
    justify-content: center;
    align-content: center;
    margin: 2rem 0;
    border: 1px solid ${props => props.theme.lightgrey};
    border-radius: 10px;
    & > * {
        margin: 0;
        padding: 5px 30px;
        border-right: 1px solid ${props => props.theme.lightgrey};
        &:last-child {
            border-right: 0;
        }
    }
    a[aria-disabled='true'] {
        color: grey;
        pointer-events: none;
    }
    p {
        line-height: 2;
    }
    @media all and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        .hide-mobile {
            display: none;
        }
    }
`;

const Pagination = props => {
    const { id, page, type = 'ALL', title = siteTitle } = props;

    let query;
    let variables;
    let url;

    switch (type) {
    case 'CATEGORY':
        query = RECIPE_BY_CATEGORY_PAGINATION_QUERY;
        variables = {
            variables: { categoryId: id }
        };
        url = 'category';
        break;
    case 'MEAT':
        query = RECIPE_BY_MEAT_PAGINATION_QUERY;
        variables = {
            variables: { meatId: id }
        };
        url = 'meat';
        break;
    case 'ALL':
        query = ALL_RECIPES_PAGINATION_QUERY;
        variables = null;
        url = 'recipes';
        break;
    default:
        query = ALL_RECIPES_PAGINATION_QUERY;
        variables = null;
        url = 'index';
        break;
    }

    const { data, error, loading } = useQuery(query, variables);

    if (loading) return <></>;
    if (error) return <ErrorMessage error={error} />;

    const { count } = data.recipesConnection.aggregate;
    const pages = Math.ceil(count / perPage);

    return (
        <>
            <Head>
                <title>
                    {title}
                    {pages > 1 ? ` | Page ${page} of ${pages}` : ''}
                    {title !== siteTitle ? ` | ${siteTitle}` : ''}
                </title>
            </Head>
            {pages > 1 && (
                <Center>
                    <PaginationStyles data-test="pagination">
                        <p>
                            <Link
                                href={{
                                    pathname: url,
                                    query: { page: page - 1 }
                                }}
                            >
                                <a className="prev" aria-disabled={page <= 1}>
                                    &larr; Prev
                                </a>
                            </Link>
                        </p>
                        <p className="hide-mobile">
                            Page {page} of{' '}
                            <span className="totalPages">
                                {pages > 0 ? pages : 1}
                            </span>
                        </p>
                        <p className="hide-mobile">{count} Items Total</p>
                        <p>
                            <Link
                                href={{
                                    pathname: url,
                                    query: { page: page + 1 }
                                }}
                            >
                                <a
                                    className="next"
                                    aria-disabled={page >= pages}
                                >
                                    Next &rarr;
                                </a>
                            </Link>
                        </p>
                    </PaginationStyles>
                </Center>
            )}
        </>
    );
};

Pagination.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string
};

export { Pagination };
