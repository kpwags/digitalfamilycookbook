import styled from 'styled-components';

const RecipeLink = styled.div`
    box-shadow: ${(props) => props.theme.bs};
    cursor: pointer;

    h2 {
        margin: 0;
        padding: 5px;
        font-size: 1.2rem;
        text-align: center;
    }

    .image-block {
        height: 250px;
    }

    img {
        margin: 0;
        object-fit: cover;
        width: 100%;
        max-height: 250px;
        min-height: 250px;
    }

    :hover {
        a:hover {
            text-decoration: none;
            color: ${(props) => props.theme.darkGreen};
        }
    }

    @media all and (max-width: 414px) {
        box-shadow: none;

        h2 {
            font-size: 1.2rem;
        }
    }
`;

export { RecipeLink };
