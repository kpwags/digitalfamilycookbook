import styled from 'styled-components';

const RecipeLink = styled.div`
    border: 1px solid hsl(0, 0%, 60%);
    box-shadow: ${props => props.theme.bs};
    cursor: pointer;

    h2 {
        margin: 10px;
        font-size: 1.3rem;
    }

    .image-block {
        width: 1fr;
    }

    img {
        margin: 0;
        object-fit: cover;
        width: 100%;
        max-height: 250px;
        min-height: 250px;
    }

    :hover {
        background-color: ${props => props.theme.paleGreen};
        border: 1px solid ${props => props.theme.green};

        a:hover {
            text-decoration: none;
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
