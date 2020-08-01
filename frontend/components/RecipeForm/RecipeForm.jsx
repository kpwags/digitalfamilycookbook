import styled, { keyframes } from 'styled-components';

// eslint-disable-next-line no-unused-vars
const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const RecipeForm = styled.form`
    box-shadow: 0 0 5px 3px hsla(0, 0%, 0%, 0.05);
    background: hsla(0, 0%, 0%, 0.02);
    border: 5px solid hsl(0, 0%, 100%);
    padding: 20px;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 600;
    width: 1000px;
    margin: 30px auto 0;

    @media all and (max-width: 800px) {
        width: 100%;
    }

    label {
        display: block;
        font-size: 1.1rem;
        margin: 1.5rem 0;

        svg {
            cursor: pointer;
            fill: hsl(0, 0%, 20%);
        }

        svg:hover {
            fill: hsl(0, 100%, 50%);
        }
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        border: 1px solid hsl(0, 0%, 0%);

        &:focus {
            outline: 0;
            border-color: ${(props) => props.theme.green};
        }
    }

    input.small {
        width: 30%;
        display: block;
    }

    textarea {
        height: 175px;
        font-family: 'Helvetica-Neue', Arial, Helvetica, sans-serif;
    }

    label.errored {
        color: hsl(0, 100%, 50%);
    }

    input.errored,
    textarea.errored,
    select.errored {
        border-width: 2px;
        border-color: hsl(0, 100%, 50%);
    }

    button,
    input[type='submit'] {
        width: auto;
        background: ${(props) => props.theme.green};
        color: hsl(0, 0%, 100%);
        border: 0;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        cursor: pointer;
    }

    button[type='button'] {
        margin-left: 10px;
        cursor: pointer;
    }

    fieldset {
        border: 0;
        padding: 0;

        &[disabled] {
            opacity: 0.5;
        }
        &::before {
            height: 10px;
            content: '';
            display: block;
            background-image: linear-gradient(
                to right,
                ${(props) => props.theme.green} 0%,
                ${(props) => props.theme.lightGreen} 50%,
                ${(props) => props.theme.green} 100%
            );
            margin-bottom: 25px;
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }

    h3 {
        margin-top: 40px;
        border-bottom: 2px solid hsl(0, 0%, 22%);
    }

    div.error-text {
        color: hsl(0, 100%, 50%);
        display: none;
        font-size: 1.2rem;
        font-weight: normal;
        margin-top: 5px;
    }

    div.error-text.visible {
        display: block;
    }

    div.image-preview {
        margin: 24px auto;
        width: 512px;

        img {
            display: block;
            max-width: 512px;
        }
    }

    div.save-button {
        margin: 40px 0 0 0;
    }

    div.recipe-form-grid {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;

        @media all and (max-width: 400px) {
            display: block;
        }

        div.ingredients-directions {
            grid-column-start: 1;
            grid-column-end: 1;
        }

        div.time-nutrition {
            grid-column-start: 2;
            grid-column-end: 2;

            input.small {
                width: 90%;
                display: block;
            }
        }

        input.small {
            width: 90%;
            display: block;
        }
    }

    div.ingredient {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;
        align-items: center;

        div.input {
            grid-column-start: 1;
            grid-column-end: 1;
        }

        div.delete-button {
            grid-column-start: 2;
            grid-column-end: 2;
        }
    }

    div.direction {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;
        align-items: center;

        div.input {
            grid-column-start: 1;
            grid-column-end: 1;

            input.small {
                width: 90%;
                display: block;
            }
        }

        div.delete-button {
            grid-column-start: 2;
            grid-column-end: 2;
        }
    }

    div.categories_meats {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        align-items: center;

        @media all and (max-width: 400px) {
            display: block;
        }

        label {
            display: inline;
            vertical-align: middle;

            @media all and (max-width: 400px) {
                display: block;
            }

            input {
                width: auto;
                margin-right: 8px;
            }
        }
    }

    span.required {
        color: hsl(0, 100%, 50%);
        font-weight: bold;
    }

    svg {
        margin-left: 12px;
        vertical-align: middle;
    }
`;

export { RecipeForm };
