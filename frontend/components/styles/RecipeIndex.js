import styled from 'styled-components';

const RecipeIndex = styled.div`
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 20px;
`;

export { RecipeIndex };
