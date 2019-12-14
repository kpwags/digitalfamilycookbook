import PropTypes from 'prop-types';
import styled from 'styled-components';

const AdminHeader = styled.div`
    width: 1000px;
    margin: 0 auto 40px;
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
`;

const PageHeader = props => {
    return (
        <AdminHeader>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="add-button">{props.children}</div>
        </AdminHeader>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export { PageHeader };
