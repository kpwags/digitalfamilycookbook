import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
    box-shadow: 0 0 5px 3px hsla(0, 0%, 0%, 0.05);
    border: 5px solid hsl(0, 0%, 100%);
    padding: 20px;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 600;
    width: ${(props) => `${props.width}px`};
    margin: 30px auto 30px;

    &.extra-margin {
        margin: 60px auto 60px;
    }

    @media all and (max-width: 800px) {
        width: 350px;
    }

    label {
        display: block;
        margin: 1.5rem 0;
        font-size: 1.1rem;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 0.5rem;
        font-size: 1.1rem;
        border: 1px solid hsl(0, 0%, 0%);
        &:focus {
            outline: 0;
            border-color: ${(props) => props.theme.green};
        }
    }

    textarea {
        height: 175px;
        font-family: 'Helvetica-Neue', Arial, Helvetica, sans-serif;
    }

    label.errored {
        color: hsl(0, 100%, 50%);

        input,
        textarea,
        select {
            border-width: 2px;
            border-color: hsl(0, 100%, 50%);
        }
    }

    input.errored,
    textarea.errored,
    select.errored {
        border-width: 2px;
        border-color: hsl(0, 100%, 50%);
    }
    button,
    input[type='submit'] {
        color: hsl(0, 0%, 100%);
        border-radius: 6px;
        margin: 0 15px 0 0;
        border-radius: 6px;
        border-width: 1px;
        border-style: solid;
        padding: 5px 15px;
        cursor: pointer;
        font-size: 1rem;
        background: ${(props) => props.theme.green};
        border-color: ${(props) => props.theme.green};
    }

    button[type='button'] {
        margin-left: 10px;
        cursor: pointer;
    }

    button.save,
    input[type='submit'] {
        background: ${(props) => props.theme.green};
        border-color: ${(props) => props.theme.green};
    }

    button:disabled,
    button[disabled],
    input[type='submit']:disabled,
    input[type='submit'][disabled] {
        background: hsla(0, 0%, 40%, 1);
        border-color: hsla(0, 0%, 40%, 1);
    }

    button:hover,
    button[hover],
    input[type='submit']:hover,
    input[type='submit'][hover] {
        color: ${(props) => props.theme.paleGreen};
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

    div.error-text {
        color: hsl(0, 100%, 50%);
        display: none;
        font-size: 1rem;
        font-weight: normal;
        margin-top: 5px;
    }

    div.success-text {
        color: hsl(120, 100%, 33%);
        display: none;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 5px;
    }

    div.error-text.visible {
        display: block;
    }

    div.image-preview {
        margin: 15px auto;
        width: 128px;
    }

    span.required {
        color: hsl(0, 100%, 50%);
        font-weight: bold;
    }
`;

Form.displayName = 'Form';

Form.propTypes = {
    width: PropTypes.number,
};

Form.defaultProps = {
    width: 500,
};

export { Form };
