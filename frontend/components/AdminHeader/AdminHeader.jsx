import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageHeader = styled.div`
    width: 96%;
    margin: 0 2% 40px 2%;
    display: grid;
    grid-template-columns: 3fr 1fr;

    .title {
        grid-column-start: 1;
        grid-column-end: 1;
        justify-self: start;

        h1 {
            margin: 0;
            padding: 0;
        }
    }

    .add-button {
        grid-column-start: 2;
        grid-column-end: 2;
        justify-self: end;
    }

    @media all and (max-width: 800px) {
        grid-template-columns: 2fr 2fr;
    }
`;

const AdminHeader = props => {
    return (
        <PageHeader id="admin-header">
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="add-button">{props.children}</div>
        </PageHeader>
    );
};

AdminHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export { AdminHeader };
