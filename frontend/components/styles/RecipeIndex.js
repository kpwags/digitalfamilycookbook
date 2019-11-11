import styled from 'styled-components';

const RecipeIndex = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(375px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 20px;
`;

export { RecipeIndex };
