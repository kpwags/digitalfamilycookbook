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

const Form = styled.form`
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 600;
    width: 500px;
    margin: 0 auto 0;
    label {
        display: block;
        margin: 1.5rem 0;
    }
    input,
    textarea,
    select {
        width: 100%;
        padding: 1rem;
        font-size: 1.8rem;
        border: 1px solid black;
        &:focus {
            outline: 0;
            border-color: ${props => props.theme.green};
        }
    }
    textarea {
        height: 175px;
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
        font-size: 2rem;
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

    div.error-text {
        color: #ff0000;
        display: none;
        font-size: 1.4rem;
        font-weight: normal;
        margin-top: 5px;
    }

    div.image-preview {
        margin: 15px auto;
        width: 128px;
    }
`;

Form.displayName = 'Form';

export { Form };
