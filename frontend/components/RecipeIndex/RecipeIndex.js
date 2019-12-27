import styled from 'styled-components';

const RecipeIndex = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 20px;

    @media all and (max-width: 414px) {
        margin: 0;
        grid-column-gap: 0;
    }
`;

export { RecipeIndex };
