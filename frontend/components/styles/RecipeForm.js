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
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 600;
    width: 1000px;
    margin: 30px auto 0;

    label {
        display: block;
        font-size: 1.1rem;
        margin: 1.5rem 0;

        svg {
            cursor: pointer;
            fill: #333333;
        }

        svg:hover {
            fill: #ff0000;
        }
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        border: 1px solid black;

        &:focus {
            outline: 0;
            border-color: ${props => props.theme.green};
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
        color: #ff0000;
    }

    input.errored,
    textarea.errored,
    select.errored {
        border-width: 2px;
        border-color: #ff0000;
    }

    button,
    input[type='submit'] {
        width: auto;
        background: ${props => props.theme.green};
        color: white;
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
            background-image: linear-gradient(to right, #00802b 0%, #43ab5e 50%, #00802b 100%);
            margin-bottom: 25px;
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }

    h3 {
        margin-top: 40px;
        border-bottom: 2px solid rgb(57, 57, 57);
    }

    div.error-text {
        color: #ff0000;
        display: none;
        font-size: 1.4rem;
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

        label {
            display: inline;
            vertical-align: middle;

            input {
                width: auto;
                margin-right: 8px;
            }
        }
    }

    span.required {
        color: #ff0000;
        font-weight: bold;
    }

    svg {
        margin-left: 12px;
        vertical-align: middle;
    }
`;

// RecipeForm.displayName = 'Form';

export { RecipeForm };
