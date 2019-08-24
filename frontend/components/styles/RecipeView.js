import styled from 'styled-components';

const RecipeView = styled.div`
    h1,
    h2 {
        color: ${props => props.theme.green};
    }

    .recipe-image {
        width: 1000px;
        margin: 10px auto 25px;
        text-align: center;

        img {
            max-width: 1000px;
        }
    }

    p.details {
        font-size: 1.25em;
        line-height: 1;
        margin-bottom: 10px;
    }

    .main {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;

        .recipe-details {
            grid-column-start: 1;
            grid-column-end: 1;

            ul.ingredients {
                margin: 0 0 0 30px;
                padding: 0;

                li {
                    font-size: 1.15em;
                    margin: 0.5em 0;
                }
            }

            ol.directions {
                margin: 0 0 0 30px;
                padding: 0;

                li {
                    font-size: 1.3em;
                    line-height: 1.75;
                    margin: 1.3em 0;
                }
            }
        }

        .nutrition {
            grid-column-start: 2;
            grid-column-end: 2;

            .info {
                border: 1px solid ${props => props.theme.black};
                .content {
                    padding: 8px;

                    h3 {
                        margin: 0;
                        padding: 0;
                        font-weight: bold;
                        border-bottom: 8px solid ${props => props.theme.black};
                        font-size: 1.6em;
                    }

                    .nutrition-data {
                        display: grid;
                        grid-template-columns: 3fr 1fr;
                        grid-template-rows: 1fr;
                        grid-column-gap: 10px;
                        grid-row-gap: 10px;
                        border-bottom: 1px solid ${props => props.theme.black};

                        .item {
                            grid-column-start: 1;
                            grid-column-end: 1;
                            font-weight: bold;
                        }

                        .value {
                            grid-column-start: 2;
                            grid-column-end: 2;
                            text-align: right;
                        }
                    }

                    .nutrition-data-calories {
                        display: grid;
                        grid-template-columns: 3fr 1fr;
                        grid-template-rows: 1fr;
                        grid-column-gap: 10px;
                        grid-row-gap: 10px;
                        border-bottom: 5px solid ${props => props.theme.black};
                        font-size: 1.25em;
                        font-weight: bold;

                        .item {
                            grid-column-start: 1;
                            grid-column-end: 1;
                        }

                        .value {
                            grid-column-start: 2;
                            grid-column-end: 2;
                            text-align: right;
                        }
                    }

                    .nutrition-data:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
`;

export { RecipeView };
