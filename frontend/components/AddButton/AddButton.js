import styled from 'styled-components';

const AddButton = styled.div`
    text-align: center;
    button {
        background: ${props => props.theme.green};
        color: hsl(0, 0%, 100%);
        font-size: 1.2rem;
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
`;

export { AddButton };
