import styled from 'styled-components';

const Box = styled.div`
    width: 55px;
    margin: 20px auto;
    font-size: 0.9rem;
    text-align: center;

    img {
        display: block;
        margin-bottom: 12px;
    }
`;

const LoadingBox = () => {
    return (
        <Box>
            <img src="/images/processing.gif" alt="Loading..." />
            Loading...
        </Box>
    );
};

export { LoadingBox };
