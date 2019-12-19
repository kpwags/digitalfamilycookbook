import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MobileAlertBox } from '../../MobileAlertBox/MobileAlertBox';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;

    @media all and (max-width: 800px) {
        display: block;
    }
`;

const Sidebar = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
        margin: 0 0 2rem 0;
        font-size: 1.2rem;

        a {
            color: ${props => props.theme.green};
        }
    }

    li.active a {
        font-weight: bold;
        color: ${props => props.theme.darkGreen};
    }

    @media all and (max-width: 800px) {
        display: none;
    }
`;

const Main = styled.div`
    grid-column-start: 2;
    grid-column-end: 2;
`;

const AdminLayout = props => {
    return (
        <Layout>
            <Sidebar>
                <ul>
                    <li className={props.activePage === 'invitationcodes' ? 'active' : ''}>
                        <Link href="/admin/invitation-codes">
                            <a className="gray">Manage Invitation Codes</a>
                        </Link>
                    </li>
                    <li className={props.activePage === 'familymembers' ? 'active' : ''}>
                        <Link href="/admin/users">
                            <a className="orange">Manage Family Members</a>
                        </Link>
                    </li>
                    <li className={props.activePage === 'categories' ? 'active' : ''}>
                        <Link href="/admin/categories">
                            <a className="green">Manage Categories</a>
                        </Link>
                    </li>
                    <li className={props.activePage === 'meats' ? 'active' : ''}>
                        <Link href="/admin/meats">
                            <a className="blue">Manage Meats</a>
                        </Link>
                    </li>
                    <li className={props.activePage === 'recipes' ? 'active' : ''}>
                        <Link href="/admin/recipes">
                            <a className="purple">Manage Recipes</a>
                        </Link>
                    </li>
                </ul>
            </Sidebar>
            <Main>
                <MobileAlertBox message="This is best viewed in landscape mode" />
                {props.children}
            </Main>
        </Layout>
    );
};

AdminLayout.propTypes = {
    activePage: PropTypes.string,
    children: PropTypes.node.isRequired
};

export { AdminLayout };
