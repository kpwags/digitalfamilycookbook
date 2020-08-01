import styled from 'styled-components';

const HeaderForm = styled.div`
    display: none;
    width: ${props => `${props.width}px`};
    margin: 30px auto;
    box-shadow: ${props => props.theme.bs};
`;

export { HeaderForm };
