import styled from 'styled-components';

const RecipeView = styled.div`
    width: 1000px;
    margin: 0 auto;

    h1,
    h2 {
        color: ${(props) => props.theme.green};
    }

    h4 {
        font-size: 1.2rem;
        margin: 0 0 12px 0;
    }

    .recipe-image {
        width: 100%;
        margin: 0 0 25px 0;
        text-align: center;

        img {
            max-width: 100%;
        }
    }

    p.details,
    div.tags {
        font-size: 1.2rem;
        line-height: 1;
        margin-bottom: 10px;
    }

    div.tags {
        margin: 16px 0 25px;
    }

    a.tag {
        background: ${(props) => props.theme.lightGreen};
        color: hsl(0, 0%, 100%);
        padding: 4px 12px;
        border-radius: 6px;
        display: inline-block;
        margin: 0 5px;
        font-size: 1rem;

        :hover {
            text-decoration: none;
            color: ${(props) => props.theme.paleGreen};
        }
    }

    button {
        cursor: pointer;
        color: hsl(0, 0%, 100%);
        padding: 5px 15px;
        font-size: 1rem;
        border-radius: 6px;
        border: 1px solid hsl(0, 100%, 40%);
        background: hsl(0, 100%, 40%);
        margin-left: 10px;
    }

    .edit-delete-links {
        margin-left: 15px;
    }

    .edit-delete-links a {
        color: hsl(0, 0%, 100%);
        padding: 5px 15px;
        font-size: 1rem;
        border-radius: 6px;
        border: 1px solid ${(props) => props.theme.green};
        background: ${(props) => props.theme.green};

        :hover {
            text-decoration: none;
        }
    }

    .main {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;

        @media print {
            display: block;
        }

        .left-column {
            grid-column-start: 1;
            grid-column-end: 1;

            ul.ingredients {
                margin: 0 0 0 30px;
                padding: 0;

                li {
                    font-size: 1.2rem;
                    margin: 0.75rem 0;
                }
            }

            ol.directions {
                margin: 0 0 0 30px;
                padding: 0;

                li {
                    font-size: 1.2rem;
                    line-height: 1.5;
                    margin: 0.75rem 0;
                }
            }
        }

        .right-column {
            grid-column-start: 2;
            grid-column-end: 2;

            @media print {
                display: none;
            }

            .info {
                border: 1px solid ${(props) => props.theme.black};
                .content {
                    padding: 8px;

                    h3 {
                        margin: 0;
                        padding: 0;
                        font-weight: bold;
                        border-bottom: 8px solid ${(props) => props.theme.black};
                    }

                    .nutrition-data {
                        display: grid;
                        grid-template-columns: 3fr 1fr;
                        grid-template-rows: 1fr;
                        grid-column-gap: 10px;
                        grid-row-gap: 10px;
                        font-size: 1rem;
                        border-bottom: 1px solid ${(props) => props.theme.black};
                        padding: 0.25rem 0;

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
                        border-bottom: 5px solid ${(props) => props.theme.black};
                        font-size: 1.2rem;
                        font-weight: bold;
                        padding: 0.25rem 0;

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

    div.management {
        margin-top: 20px;

        p {
            font-weight: bold;
            color: ${(props) => props.theme.green};
        }
    }

    @media print {
        .hide-print {
            display: none;
        }
    }

    @media all and (max-width: 800px) {
        width: 100%;

        .recipe-image {
            width: 100%;
            margin: 10px auto 25px;
            text-align: center;

            img {
                max-width: 100%;
            }
        }
    }

    @media all and (max-width: 767px) {
        width: 100%;

        .recipe-image {
            display: none;
        }

        .main,
        .nutrition-data,
        .nutrition-data-calories {
            display: block;
        }

        .nutrition {
            margin: 30px 0 0 0;
            padding: 30px 0 0 0;
            border-top: 1px solid ${(props) => props.theme.black};
        }
    }
`;

export { RecipeView };
