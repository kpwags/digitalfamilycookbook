import styled from 'styled-components';

const AddButton = styled.div`
    margin: 15px 0;
    text-align: center;
    button {
        background: ${props => props.theme.green};
        color: #ffffff;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        border: 0;
        cursor: pointer;
    }
`;

export { AddButton };
