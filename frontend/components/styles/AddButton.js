import styled from 'styled-components';

const AddButton = styled.div`
    margin: 15px 0;
    button {
        background: ${props => props.theme.green};
        color: #ffffff;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        border: 0;
    }
`;

export { AddButton };